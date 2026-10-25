# AI Agent 协作与架构认知指南 (AGENTS.md)

> 本文档是给所有参与本项目编码的 AI Agent（包括 Antigravity、Cursor、Windsurf、Claude Code、GitHub Copilot 等）编写的上下文与防退化规范。在修改任何代码前，请务必完整通读本指南。

---

## 1. 项目概览与技术栈

- **框架核心**：[Astro](https://astro.build/) (v7.4+)
- **样式系统**：Tailwind CSS v4 (采用 `@tailwindcss/vite` 插件及 `@theme` CSS-first 设计系统，配合 `@tailwindcss/typography`)
- **内容格式**：MDX (`.mdx`) + Markdoc (`.mdoc`) 双轨机制
- **包管理器**：`pnpm`
- **SPA 转场**：Astro 原生 `ClientRouter` (View Transitions)
- **部署目标**：GitHub Pages 静态托管 (通过 `.github/workflows/deploy.yml` 自动打包)

---

## 2. 核心架构设计与防退化防线 (Critical Invariants)

在进行任何功能修改、重构或修 Bug 时，**严禁破坏以下既定设计**：

### ① 顶栏与独立滚动容器物理分离 (Navbar Layout)
- **设计**：`BaseLayout.astro` 采用 `h-dvh overflow-hidden flex flex-col` 布局。顶部 `<Header />` 放置于顶端独立的 `div`（非 `sticky` 浮层），主体由独立的 `<div id="main-scroll-container" class="flex-1 overflow-y-auto scroll-smooth flex flex-col">` 承载。
- **原因**：避免传统 sticky navbar 遮盖不同级别锚点标题（`h1/h2/h3` 文字大小不同导致的偏移行距不可控）。
- **约束**：**切勿将导航栏改回 `sticky` 覆盖模式**，页面滚动位置与监听请始终绑定 `#main-scroll-container`。

### ② 上一篇 / 下一篇严格受限于“合集（Series）”内
- **设计**：文章 Schema (`content.config.ts`) 包含 `series` 字段：
  ```yaml
  series: 'Astro 零基础指南'
  # 或显式指定章节顺序
  series:
    name: 'Astro 零基础指南'
    order: 2
  ```
- **约束**：
  - 文章详情页底部的“上一篇 / 下一篇”**仅用于合集内部的顺序切换**。
  - **非合集文章严禁显示上一篇/下一篇**。
  - 合集内部按 `order`（或 `pubDate`）升序排序（第 1 篇 ➔ 第 2 篇 ➔ 第 3 篇）。

### ③ 避免长类名 (Tailwind "No Long Class" 策略)
- **约束**：禁止在模板中堆叠数十个原子 class。
  - 重复 UI 必须封装为 Astro 组件（如 `<Card />`、`<TagList />`）。
  - 核心色彩与样式使用 `src/styles/global.css` 声明的 CSS 变量（`--color-surface`, `--color-text`, `--color-border`, `--color-primary-*` 等）。
  - 文章正文排版严格使用 `@tailwindcss/typography` 的 `.prose` 类。

### ④ Markdoc 受控 Tag 体系 (杜绝一次性乱版)
- **设计**：日常博文推荐使用 Markdoc (`.mdoc`)，受控组件统一在 `markdoc.config.mjs` 中注册（如 Callout）。
- **约束**：禁止在普通 Markdown 中随意写入未规范的一次性 JSX 或复杂 HTML，保持内容干净、结构受控。

### ⑤ 目录（TOC）Fixed 悬浮规范
- **桌面端 (`xl:`)**：目录必须固定悬浮于文档右侧（`fixed top-24`），具有毛玻璃背景与阅读位置指示线。
- **移动端 (`< xl:`)**：在屏幕右下角提供悬浮“目录”折叠按钮，点击展开弹窗，跳转后自动收起。
- **滚动高亮**：计算必须基于 `#main-scroll-container` 内的实际视口相对坐标。

### ⑥ Shiki 双主题代码高亮与深浅色模式
- **设计**：浅色模式采用 `github-light`，深色模式采用 `github-dark`。
- **约束**：深色模式适配由 `src/styles/global.css` 中的 `html.dark .astro-code` 系列规则通过 CSS 变量强制覆盖，**不可删除这些 CSS 覆盖规则**。

### ⑦ 客户端生命周期与 SPA 兼容
- **设计**：全站启用 `<ClientRouter />`。
- **约束**：所有客户端交互脚本（`CopyCode.astro`、`TOC.astro`、`ThemeToggle.astro`、`BackToTop.astro`、`ShareButtons.astro` 等）**必须监听 `document.addEventListener('astro:page-load', ...)`**，且 script 标签必须带有 `is:inline`，防止 Astro 打包时将其优化或误剔除。

### ⑧ A11y 可访问性与悬停说明
- **约束**：所有按钮（切换主题、复制代码、返回顶部、分享等）及链接必须配有描述性的 `title="..."` 悬停提示和对应的 `aria-label="..."` / `aria-expanded` 属性。

---

## 3. 核心目录结构导览

```
.
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署流水线
├── astro.config.mjs               # Astro 配置 (Vite 插件、MDX/Markdoc/Sitemap)
├── markdoc.config.mjs             # Markdoc 受控 Tag 注册
├── package.json                   # 依赖与脚本
├── src/
│   ├── components/                # 基础可复用 UI 组件
│   │   ├── BackToTop.astro        # 右下角悬浮返回顶部按钮
│   │   ├── BaseHead.astro         # SEO、OpenGraph、Twitter Card、JSON-LD
│   │   ├── Card.astro             # 文章卡片 (支持合集徽章)
│   │   ├── CopyCode.astro         # 代码块一键复制脚本
│   │   ├── Footer.astro           # 页脚
│   │   ├── Giscus.astro           # 评论组件 (基于 GitHub Discussions)
│   │   ├── Header.astro           # 独立顶端导航栏
│   │   ├── ShareButtons.astro     # 社交分享 (X/微博/TG/邮件/系统分享/复制链接)
│   │   ├── TagList.astro          # 标签列表
│   │   ├── ThemeToggle.astro      # 明暗主题切换
│   │   ├── TOC.astro              # Fixed 悬浮目录组件
│   │   └── markdoc/Callout.astro  # Markdoc 受控提示框
│   ├── content.config.ts          # Content Layer Schema (包含 series 校验)
│   ├── content/posts/             # 博客文章源文件 (.mdx, .mdoc)
│   ├── layouts/
│   │   ├── BaseLayout.astro       # 基础骨架 (包含物理顶栏与独立滚动容器)
│   │   ├── PageLayout.astro       # 独立静态页面布局
│   │   └── PostLayout.astro       # 文章正文专属布局
│   ├── pages/
│   │   ├── index.astro            # 首页
│   │   ├── archive.astro          # 归档页
│   │   ├── about.astro            # 关于页
│   │   ├── search.astro           # 纯静态全文搜索页
│   │   ├── search.json.ts         # 客户端全文搜索索引端点
│   │   ├── series/                # 专栏合集总览与单合集阅读页
│   │   ├── categories/            # 分类页
│   │   ├── tags/                  # 标签页
│   │   └── posts/[...slug].astro  # 文章详情页路由
│   ├── styles/global.css          # 全局样式、Tailwind v4 主题与 Shiki 覆盖
│   ├── types.ts                   # 站点配置 (SITE) 与导航项 (NAV_ITEMS)
│   └── utils/
│       ├── posts.ts               # 文章查询与合集排序辅助函数
│       └── reading-time.ts        # 中英双语阅读时长估算
```

---

## 4. 常用维护指令

```bash
# 安装依赖
pnpm install

# 启动本地热重载开发服务器
pnpm dev

# 编译纯静态生产产物
pnpm build

# 预览静态构建结果 (模拟生产环境)
pnpm preview
```
