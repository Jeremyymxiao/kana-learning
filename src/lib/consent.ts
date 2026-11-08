/**
 * Cookie / 分析同意状态（GDPR 最小实现）。
 *
 * - 默认未决定：GA 与 Clarity 都不加载。
 * - 用户选择后写入 localStorage，并在同窗口广播事件，供分析脚本组件立即响应。
 * - Umami 与 Vercel Analytics 为无 Cookie 方案，不受此开关影响。
 */
export type ConsentValue = 'granted' | 'denied';

const STORAGE_KEY = 'learnkana.consent.v1';
export const CONSENT_EVENT = 'learnkana:consent-change';

export const getConsent = (): ConsentValue | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = (value: ConsentValue): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage 不可用（隐私模式）时，仅本次会话生效
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
};
