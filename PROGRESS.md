# 项目开发进展与会话交接记录 (PROGRESS.md)

> **多端协作指引**：在更换电脑或开启新会话时，让 AI 优先阅读本文档与 `AGENTS.md`，即可瞬间无缝衔接上一终端的工作进度。

---

## 📌 当前状态速览 (Current Status)

- **当前阶段**：Phase 1（核心功能 MVP）与 Phase 2（阅读体验与发现）**已 100% 交付完成**。
- **构建状态**：静态构建（`pnpm build`）19 个静态路由全部通过，无报错，无死链。
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
- [x] **Shiki 双主题代码高亮**：浅色模式 `github-light`，深色模式 `github-dark`，深色模式 CSS 变量强制覆盖
- [x] **代码块一键复制**：全代码块自动注入悬浮“复制代码”按钮，带“已复制”即时视觉反馈
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

- **2026-10-25**：
  - 重构顶栏与滚动容器为独立分层结构，彻底修复锚点跳转时不同标题大小的遮挡问题。
  - 为正文页面右下角增加自适应平滑返回顶部（BackToTop）按钮。
  - 完善全站 `.gitignore` 规则，准备私有库多端同步。
  - 创建 `AGENTS.md`、`PROGRESS.md`、`.env.example`，固化项目所有知识上下文。
