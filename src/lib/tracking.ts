/**
 * 统一的埋点入口。
 *
 * 设计约束：
 * - gtag 只在用户同意分析 Cookie 后才会被加载；未加载时这里是 no-op，不报错。
 * - 不依赖任何第三方 SDK，避免把埋点散落在组件里。
 */
export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (action: string, params: TrackParams = {}): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', action, params);
  } catch (error) {
    // 埋点失败绝不影响学习流程
    console.warn('[tracking] failed to send event', action, error);
  }
};

export const trackQuizStart = (kanaType: string, quizType: string) =>
  trackEvent('quiz_start', { kana_type: kanaType, quiz_type: quizType });

export const trackQuizAnswer = (kanaType: string, quizType: string, correct: boolean) =>
  trackEvent('quiz_answer', { kana_type: kanaType, quiz_type: quizType, correct });

export const trackQuizComplete = (kanaType: string, quizType: string, score: number) =>
  trackEvent('quiz_complete', { kana_type: kanaType, quiz_type: quizType, score });
