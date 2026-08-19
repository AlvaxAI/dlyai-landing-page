# DLY AI — 官网

Deploy. Learn. Yield. — DLY AI 的对外门户站。

## 技术栈

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · framer-motion · shadcn/ui 结构

## 开发

```bash
npm run dev        # http://localhost:3000
npm run build      # 静态导出到 out/
npm run lint
npm run typecheck  # 先跑 next typegen 再 tsc，干净检出也能通过
```

`next build` 输出静态站点到 `out/`，由 `.github/workflows/deploy.yml` 部署到 GitHub Pages。

## 结构

```
docs/web-brand-brief.md        品牌与设计基线 —— 改任何东西之前先看这个
src/content/types.ts           内容契约（SiteContent）
src/content/en.ts              英文文案（唯一文案来源）
src/content/index.ts           i18n 入口，getContent(locale)
src/app/globals.css            设计 token（品牌色 + shadcn 映射）
src/components/motion.tsx      动效原语（解码文本 / 数字滚动 / 扫描线 / clip 揭幕 / 磁吸 / 视差）
src/components/reveal.tsx      滚动进场
src/components/ui/             shadcn + registry 组件 + 蓝图网格 + 十字准星光标
src/components/primitives.tsx  Logo / Section / 按钮 / 图标
src/components/sections/       各个页面区块
public/brand · cases · team    品牌、案例与人物资产
```

## 加中文版

1. 新建 `src/content/zh.ts`，满足 `SiteContent`（编译器会强制形状一致）
2. 在 `src/content/index.ts` 的 `dictionaries` 和 `locales` 里注册 `zh`
3. 新建 `src/app/zh/page.tsx`，调用 `getContent("zh")`

英文根路径 `/` 不受影响。中文长文案已有现成素材：`DLY-AI-Deck/Brand/brand-story.md`、`brand-messaging.md`。

## 不能碰的几条

- Slogan 全站唯一：**Deploy. Learn. Yield.**
- 每屏只允许**一个** Yield lime 时刻；正文永不用 Yield
- 字体只在 Space Grotesk / Inter / JetBrains Mono / Noto Sans SC 之内
- 禁渐变、发光、glassmorphism、圆角卡片堆、投影
- DLY 是 **team**，不是 platform / tool / solution；对方是 **clients**
- 未经书面授权，不出现任何真实客户名
- 任何新动效都必须过 `useReducedMotion()`，并保证无 JS 时内容可见

完整清单见 `docs/web-brand-brief.md`。
