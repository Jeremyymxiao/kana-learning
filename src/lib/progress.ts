/**
 * 假名掌握度存储（最小可用 SRS 的数据层）。
 *
 * 设计：
 * - 以「平假名」作为每个假名的稳定 key（片假名共用同一掌握度）。
 * - localStorage 持久化，版本化，解析失败时自动降级为空进度（不抛错）。
 * - 掌握度 0–3：0 新学 / 1 见过 / 2 熟悉 / 3 已掌握（连续答对 + 正确率）。
 * - 只提供纯函数 + 读写，不依赖 React，方便在 hook、结果页、服务端无关的地方用。
 */

export type MasteryLevel = 0 | 1 | 2 | 3;

export interface KanaStat {
  /** 答对次数 */
  correct: number;
  /** 答错次数 */
  wrong: number;
  /** 当前连续答对次数 */
  streak: number;
  /** 最近一次出现时间（ms） */
  lastSeenAt: number;
}

export type ProgressMap = Record<string, KanaStat>;

const STORAGE_KEY = 'learnkana.progress.v1';
const EMPTY_STAT: KanaStat = { correct: 0, wrong: 0, streak: 0, lastSeenAt: 0 };

// ── 读 / 写 ────────────────────────────────────────────────────────────

export const loadProgress = (): ProgressMap => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    const result: ProgressMap = {};
    for (const [kana, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!value || typeof value !== 'object') continue;
      const stat = value as Partial<KanaStat>;
      result[kana] = {
        correct: Number(stat.correct) || 0,
        wrong: Number(stat.wrong) || 0,
        streak: Number(stat.streak) || 0,
        lastSeenAt: Number(stat.lastSeenAt) || 0,
      };
    }
    return result;
  } catch {
    return {};
  }
};

export const saveProgress = (map: ProgressMap): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // 隐私模式 / 配额满：静默失败，不影响练习
  }
};

/** 清空进度（设置页或调试用） */
export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

// ── 掌握度 ─────────────────────────────────────────────────────────────

export const getMastery = (stat: KanaStat | undefined): MasteryLevel => {
  if (!stat || stat.correct + stat.wrong === 0) return 0;
  const attempts = stat.correct + stat.wrong;
  const accuracy = stat.correct / attempts;

  if (stat.correct >= 3 && stat.streak >= 2 && accuracy >= 0.8) return 3;
  if (stat.correct >= 2 && accuracy >= 0.6) return 2;
  return 1;
};

export const getMasteredCount = (map: ProgressMap): number =>
  Object.values(map).filter((stat) => getMastery(stat) === 3).length;

export const getSeenCount = (map: ProgressMap): number =>
  Object.values(map).filter((stat) => stat.correct + stat.wrong > 0).length;

/** 弱点优先级：错得越多越靠前；同分时越久没练越靠前 */
export const getWeaknessScore = (stat: KanaStat | undefined, now = Date.now()): number => {
  if (!stat) return 0;
  const attempts = stat.correct + stat.wrong;
  if (attempts === 0) return 0;
  const errorRate = stat.wrong / attempts;
  const recencyBoost = stat.lastSeenAt
    ? Math.min(1, (now - stat.lastSeenAt) / (1000 * 60 * 60 * 24 * 7))
    : 1;
  return errorRate * 2 + recencyBoost;
};

// ── 记录一次答题 ───────────────────────────────────────────────────────

/** 记录答题结果，返回新的进度表（便于调用方同时更新 UI 状态） */
export const recordKanaResult = (
  hiragana: string,
  correct: boolean,
  map: ProgressMap = loadProgress()
): ProgressMap => {
  if (!hiragana) return map;
  const prev = map[hiragana] ?? EMPTY_STAT;
  const next: KanaStat = {
    correct: prev.correct + (correct ? 1 : 0),
    wrong: prev.wrong + (correct ? 0 : 1),
    streak: correct ? prev.streak + 1 : 0,
    lastSeenAt: Date.now(),
  };
  const updated = { ...map, [hiragana]: next };
  saveProgress(updated);
  return updated;
};

// ── 出题加权 ───────────────────────────────────────────────────────────

/**
 * 按掌握度给每个假名一个权重：
 * - 答错过的（mastery < 2）：4
 * - 没见过的：2
 * - 熟悉的：1
 * - 已掌握的：0.4（仍会复习，但不占主线）
 */
export const getKanaWeight = (stat: KanaStat | undefined): number => {
  const mastery = getMastery(stat);
  if (mastery === 3) return 0.4;
  if (mastery === 2) return 1;
  if (mastery === 1) return 4;
  return 2;
};

/**
 * 从池子里按权重抽取 n 个互不重复的条目（加权无放回）。
 * `pool` 需要带 `hiragana` 字段作为进度 key。
 */
export const sampleWeighted = <T extends { hiragana: string }>(
  pool: T[],
  count: number,
  map: ProgressMap = loadProgress(),
  random: () => number = Math.random
): T[] => {
  const remaining = pool.map((item) => ({
    item,
    weight: getKanaWeight(map[item.hiragana]),
  }));
  const picked: T[] = [];

  while (picked.length < Math.min(count, pool.length) && remaining.length > 0) {
    const total = remaining.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = random() * total;
    let index = remaining.length - 1;
    for (let i = 0; i < remaining.length; i++) {
      cursor -= remaining[i].weight;
      if (cursor <= 0) {
        index = i;
        break;
      }
    }
    picked.push(remaining[index].item);
    remaining.splice(index, 1);
  }

  return picked;
};

/** 结果页/首页用的汇总 */
export interface ProgressSummary {
  mastered: number;
  seen: number;
  total: number;
  /** 最需要练的假名（最多 8 个，按弱点分排序） */
  weakest: Array<{ hiragana: string; stat: KanaStat; mastery: MasteryLevel }>;
}

export const getProgressSummary = (
  pool: Array<{ hiragana: string }>,
  map: ProgressMap = loadProgress()
): ProgressSummary => {
  const now = Date.now();
  const weakest = pool
    .map((item) => ({
      hiragana: item.hiragana,
      stat: map[item.hiragana],
      mastery: getMastery(map[item.hiragana]),
      score: getWeaknessScore(map[item.hiragana], now),
    }))
    .filter((entry) => entry.stat && entry.mastery < 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ hiragana, stat, mastery }) => ({ hiragana, stat: stat as KanaStat, mastery }));

  return {
    mastered: getMasteredCount(map),
    seen: getSeenCount(map),
    total: pool.length,
    weakest,
  };
};
