// Google Analytics 测量 ID
export const GA_MEASUREMENT_ID = 'G-0M56J3EFEE';

// 为 window.gtag 添加类型声明
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// 页面浏览事件
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 自定义事件
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}; 