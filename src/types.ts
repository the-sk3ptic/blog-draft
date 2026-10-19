export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  lang: string;
}

export const SITE: SiteConfig = {
  title: 'My Blog',
  description: '一个分享技术与生活的个人博客',
  author: 'Blog Author',
  lang: 'zh-CN',
};

export interface NavItem {
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { title: '首页', href: '/' },
  { title: '标签', href: '/tags' },
  { title: '分类', href: '/categories' },
  { title: '归档', href: '/archive' },
  { title: '关于', href: '/about' },
];
