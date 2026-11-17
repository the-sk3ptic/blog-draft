# 项目开发进展与会话交接记录 (PROGRESS.md)

> **多端协作指引**：在更换电脑或开启新会话时，让 AI 优先阅读本文档与 `AGENTS.md`，即可瞬间无缝衔接上一终端的工作进度。

---

## 📌 当前状态速览 (Current Status)

- **当前阶段**：Phase 1、Phase 2 全部完成；SPA 静态资源分离与轻量级 Fetch 性能深度优化已交付。
- **构建状态**：静态构建（`pnpm build`）19 个静态路由全部通过，无报错，无死链。
- **优化指标**：全站内联 CSS 降至 0 字节；全站客户端 JS 统一收敛打包为外部长效缓存 bundle；文章页 Gzip 传输体积仅 ~7.4KB。
- **发布策略**：当前为本地私有库开发阶段，待内容与视觉完备后一键转为 Public 并触发 GitHub Pages 自动部署。

---

## ✅ 已交付功能清单 (Completed Features)

### 1. 核心博客基建 (Phase 1)
- [x] **Astro 7.4 + Tailwind CSS v4** 工程初始化与 Vite 插件配置
- [x] **无刷新 SPA 体验**：基于 Astro `ClientRouter` (View Transitions)
- [x] **响应式布局系统**：物理独立顶栏 + 独立主滚动容器（彻底消除锚点标题遮挡）
- [x] **明暗模式自动与手动切换**：跟随系统 + 本地存储记忆，防闪烁脚本
- [x] **双轨写作支持**：
  - MDX 格式支持（自由嵌入组件）
  - Markdoc 格式与受控 Tag 体系（内置 Callout 提示框组件）
- [x] **全功能页面**：
  - 首页（卡片流 + 优雅元数据）
  - 标签页（全标签总览 + 单标签过滤）
  - 分类页（全分类总览 + 单分类过滤）
  - 归档页（按年份时间轴分组）
  - 独立关于页（About）
- [x] **自动订阅与爬虫收录**：
  - RSS 订阅源自动生成 (`/rss.xml`)
  - 搜索引擎 Sitemap (`sitemap-index.xml`)

### 2. 阅读体验与深度交互 (Phase 2)
- [x] **文章时效性提示横幅与修改时间戳**：
  - Schema 支持 `lastModified` 与灵活的 `banner`（支持布尔、自定义文本或结构化类型）
  - 实现自适应明暗模式的 `ArticleBanner` 组件，在文章开头醒目提示内容更新状态与技术时效性
  - 文章详情页与卡片列表同步展示最后编辑时间，并联动 SEO JSON-LD / OpenGraph
- [x] **Shiki 双主题代码高亮与可选标题（Title）**：
  - Markdoc (`.mdoc`) 自定义 `fence` 节点无缝集成 Shiki 双主题高亮，自动识别并高亮文档中记录的代码语言（astro, typescript, bash 等）
  - MDX (`.mdx`) 与 Markdoc (`.mdoc`) 统一支持代码块可选标题字段（支持 `title="..."`、`{% title="..." %}` 及 `lang:filename` 语法）
  - 顶置标题栏展示文件图标、标题名称、大写语言指示徽章与紧凑复制按钮
  - 无标题代码块平滑降级为极简悬浮复制按钮，保持视觉干净统一
- [x] **代码块一键复制**：全代码块自动注入悬浮/工具栏“复制代码”按钮，带“已复制”即时视觉反馈
- [x] **目录（TOC）Fixed 悬浮效果**：
  - 桌面端：Fixed 固定在文档右侧视口，带当前阅读小节平滑高亮与进度指示
  - 移动端：右下角 Fixed 悬浮抽屉按钮，点击唤出弹窗，点击章节跳转后自动收起
- [x] **平滑返回顶部**：右下角独立悬浮按钮（滚动超过 250px 自动淡入，多端自适应防遮挡）
- [x] **中英文阅读时长与字数估算**：中文字符（~400字/分）+ 英文单词（~200词/分）混合精确计算
- [x] **专栏合集（Series）系统**：
  - Schema 原生支持 `series` 字段与自定义章节序号 `order`
  - 文章顶部展示“本文收录于合集《XXX》（第 X/N 篇）”横幅
  - 文章底部“上一篇/下一篇”导航**严格受限于同一合集内**，非合集文章不显示
  - 专属页面：合集总览 (`/series`)、单合集按序章节页 (`/series/[series]`)
- [x] **社交分享功能**：
  - 文章底部集成分享组件，支持 X (Twitter)、新浪微博、Telegram、邮件
  - 支持“一键复制文章链接”与“系统原生分享（Web Share API）”
- [x] **完整 SEO / Social Meta**：
  - Canonical URL、Open Graph 协议（文章专属属性）、Twitter 社交大图卡片
  - 自动注入 Schema.org `BlogPosting` 与 `WebSite` JSON-LD 结构化数据
- [x] **全站 A11y 可访问性增强**：
  - 全局高对比度 `:focus-visible` 键盘轮廓环
  - 所有按钮与链接均配备完备的 `title` 悬停说明与 `aria-*` 标签

---

## 📋 下一步待办与演进方向 (Backlog / Future Phases)

- [ ] **视觉微调与主题配色**：根据实际审美对卡片圆角、字体组合、配色方案进行个性化调优
- [ ] **Giscus 评论开通**：在 GitHub 仓库开启 Discussions，填入 `repoId` 与 `categoryId` 正式开启读者评论
- [ ] **图文 Lightbox 弹窗**：为博文正文配图添加点击放大预览能力
- [ ] **转为 Public 并上线**：按照指引将私有库转为 Public，并在 `.github/workflows/deploy.yml` 取消 push 与 deploy 注释，触发 GitHub Pages 自动上线
- [ ] **Phase 4 内容后台管理 (可选)**：接入 Tina CMS 或 Keystatic 进行在线可视化编辑
- [ ] **多语言 i18n (可选)**：预留架构扩展英文版博文

---

## 📝 跨设备工作交接记录 (Changelog / Handover Log)

- **2026-10-27**：
  - **SPA 架构资源分离与轻量化 Fetch 优化**：
    - `astro.config.mjs` 配置 `build.inlineStylesheets: 'never'`，全面禁用 CSS 内联注入，全站内联样式彻底降至 0 字节，CSS 独立为外部哈希样式表并由浏览器强缓存。
    - 开启 Astro 原生 `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`，实现鼠标悬停自动预拉取。
    - 抽离收敛全站客户端脚本至 `src/scripts/`（`theme.ts`, `nav.ts`, `copy-code.ts`, `toc.ts`, `share.ts`, `back-to-top.ts`），并在 `BaseLayout.astro` 统一由 `app.ts` 挂载，彻底消除了各组件碎片化内联 script，全站 JS 统一打包为一个外部缓存 chunk。
    - 经性能对比测试，页面切换时拉取的 HTML Gzip 传输体积降至 ~7.4KB，实现极速纯文本骨架置换，不再重复传输 CSS/JS。
  - **精简 `<head>` Meta 冗杂配置**：
    - 去除无标准的 `<meta name="title">`（由 `<title>` 接管）。
    - 剔除全部已淘汰的 `article:*` 冗余属性（现代搜索与社交平台已完全由 Schema.org JSON-LD 结构化数据接管）。
    - 精简 `twitter:*`：仅保留 `<meta name="twitter:card" content="summary_large_image" />`，其余 `twitter:title/desc/image/url` 依官方规范全自动回退继承 `og:*`。
    - Open Graph 精简为核心 5 属性（`og:type`, `og:url`, `og:title`, `og:description`, `og:image`），大幅净化 HTML 头部。
  - 同步更新 `AGENTS.md` 规范。
- **2026-10-26**：
  - 实现文章时效性提示横幅（`ArticleBanner`）与最后修改时间戳（`lastModified`），同步更新文章卡片与 SEO 结构化数据。
  - 实现代码块可选标题（Title）字段支持，并在 MDX 与 Markdoc 双轨内容中完全统一输出与表现。
  - 为 Markdoc 编写自定义 `CodeBlock` 节点组件，解决 Markdoc 代码块默认无语法高亮的问题，按文档记录的语言（如 astro, typescript, bash 等）提供完整的 Shiki 双主题高亮。
  - 升级 `CopyCode.astro` 客户端逻辑与 `global.css`，支持在有标题栏时将复制按钮有机嵌入标题栏右侧工具区，无标题时保持优雅悬浮。
  - 将 `add_article_banner_and_timestamp` 与 `add_code_block_title` 两个特性完整合并至 `main` 分支并通过构建验证。
- **2026-10-25**：
  - 重构顶栏与滚动容器为独立分层结构，彻底修复锚点跳转时不同标题大小的遮挡问题。
  - 为正文页面右下角增加自适应平滑返回顶部（BackToTop）按钮。
  - 完善全站 `.gitignore` 规则，准备私有库多端同步。
  - 创建 `AGENTS.md`、`PROGRESS.md`、`.env.example`，固化项目所有知识上下文。
