# 网站组件化重构计划

本文档旨在规划将个人作品集网站重构为可插拔组件式架构的详细步骤和方案。

## 1. 总体目标

将现有网站重构为一个基于可配置、可重用组件的模块化系统。这将提高代码的可维护性、灵活性和可扩展性，使得未来添加或修改页面内容变得更加简单高效。

## 2. 核心概念

- **组件（Component）**: 一个独立的、可重用的 UI 单元，封装了自身的 HTML 结构、CSS 样式和 JavaScript 逻辑。每个组件都将是一个单独的 `.html` 文件。
- **页面配置（Page Configuration）**: 每个页面（如首页）的内容将由一个配置对象定义，该对象描述了页面上要渲染的组件列表及其各自的数据。
- **动态渲染（Dynamic Rendering）**: `main.js` 将负责解析页面配置，获取相应组件的 HTML 文件，并使用提供的数据将其动态渲染到页面上。

## 3. 计划任务列表

### 第一阶段：核心架构重构

- [ ] **任务 1.1：创建组件目录和基础组件文件**
    - 描述：在 `pages/` 目录下创建一个 `components/` 子目录，用于存放所有可重用的组件文件。
    - 状态：**待办**

- [ ] **任务 1.2：修改 `config.js` 以支持页面组件配置**
    - 描述：重构 `config.js`，为每个页面（首先是首页）创建一个组件配置数组。每个配置项将包含组件类型和传递给该组件的数据。
    - 状态：**待办**

- [ ] **任务 1.3：增强 `main.js` 的页面加载逻辑**
    - 描述：修改 `loadPage` 函数，使其能够读取页面配置，遍历组件列表，并根据配置动态获取和渲染每个组件。
    - 状态：**待办**

### 第二阶段：组件化重构

- [ ] **任务 2.1：重构轮播图为 `carousel-component.html`**
    - 描述：分析 `index.html` 和相关 CSS/JS，将轮播图部分提取到一个独立的组件文件中。组件数据（如图片列表）应通过配置传入。
    - 状态：**待办**

- [ ] **任务 2.2：重构欢迎模块为 `hero-component.html`**
    - 描述：将欢迎模块（标题、介绍、按钮）重构为一个通用的 `hero` 组件。按钮的文本、链接（内部路由或外部 URL）应可配置。
    - 状态：**待办**

- [ ] **任务 2.3：重构技能展示为 `feature-list-component.html`**
    - 描述：将技能展示部分（图标、标题、描述）重构为一个 `feature-list` 组件。列表中的每个项目都应是可配置的。
    - 状态：**待办**

- [ ] **任务 2.4：重构愿景模块为 `promo-section-component.html`**
    - 描述：将愿景模块（小标题、介绍、按钮、背景色）重构为一个 `promo-section` 组件。所有元素都应可配置。
    - 状态：**待办**

### 第三阶段：文档和清理

- [ ] **任务 3.1：创建组件说明文档 `components_guide.md`**
    - 描述：创建一个新的 Markdown 文件，详细说明每个可用组件的用途、配置选项和使用示例。
    - 状态：**待办**

- [ ] **任务 3.2：清理旧代码**
    - 描述：移除 `index.html` 中所有硬编码的旧模块内容，并清理 `common.css` 和 `main.js` 中不再需要的代码。
    - 状态：**待办**

## 4. 组件设计草案

### 4.1 `carousel-component.html`

- **用途**: 显示一个图片轮播图。
- **配置示例**:
  ```javascript
  {
    component: 'carousel-component',
    data: {
      slides: [
        { image: 'assets/images/slide1.jpg', alt: 'Slide 1' },
        { image: 'assets/images/slide2.jpg', alt: 'Slide 2' }
      ]
    }
  }
  ```

### 4.2 `hero-component.html`

- **用途**: 用于页面的主要介绍或欢迎区域。
- **配置示例**:
  ```javascript
  {
    component: 'hero-component',
    data: {
      title: '欢迎来到我的作品集',
      description: '在这里，您将发现我的项目、技能和热情所在。',
      button: { text: '了解更多', link: '#about' } // link可以是内部路由或外部URL
    }
  }
  ```

### 4.3 `feature-list-component.html`

- **用途**: 以列表形式展示多个特性或技能。
- **配置示例**:
  ```javascript
  {
    component: 'feature-list-component',
    data: {
      features: [
        { icon: 'fa-code', title: '前端开发', description: '精通 HTML, CSS, JavaScript。' },
        { icon: 'fa-server', title: '后端开发', description: '熟悉 Node.js, Python。' }
      ]
    }
  }
  ```

### 4.4 `promo-section-component.html`

- **用途**: 用于带有背景色的推广或行动号召区域。
- **配置示例**:
  ```javascript
  {
    component: 'promo-section-component',
    data: {
      subtitle: '我的愿景',
      title: '用代码创造价值',
      description: '我致力于构建能够解决实际问题并带来积极影响的应用程序。',
      button: { text: '联系我', link: '#contact' },
      backgroundColor: '#f8f9fa'
    }
  }
  ```

---

**下一步**: 请确认此计划。确认后，您可以指示我开始执行“任务 1.1”。