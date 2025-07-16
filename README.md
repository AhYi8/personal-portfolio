# 个人作品集网站

这是一个个人作品集网站，旨在展示我的技能、项目和经验。它具有现代化的响应式设计，并全面概述了我的专业能力。

## 功能特性

- **动态内容加载**：无需重新加载整个网站即可异步加载页面，提供流畅的用户体验。
- **响应式设计**：布局适应不同的屏幕尺寸，确保在台式机、平板电脑和移动设备上都能获得出色的体验。
- **交互式元素**：包括联系表单和项目展示等互动组件。
- **模块化架构**：代码被组织成可重用的组件，易于维护和扩展。

## 项目架构

该项目遵循模块化架构，将不同的功能分离到不同的文件和目录中。

### 文件结构

```
personal-portfolio/
├── assets/
│   └── images/         # 静态图片资源
├── config/
│   └── config.js       # 配置文件 (例如, EmailJS 密钥)
├── css/
│   └── common.css      # 共享 CSS 样式
├── js/
│   └── main.js         # 用于应用程序逻辑的主要 JavaScript 文件
├── pages/
│   ├── home.html       # 主页的 HTML 内容
│   ├── about.md        # “关于”页面的 Markdown 内容
│   ├── projects.html   # 项目页面的 HTML 内容
│   ├── skills.html     # 技能页面的 HTML 内容
│   └── contact.html    # 联系页面的 HTML 内容
├── index.html          # 应用程序的主入口点
├── README.md           # 英文版说明文件
├── README.zh-CN.md     # 本文件
└── design_plan.md      # 项目设计和规划文档
```

### 关键组件

- **`index.html`**：应用程序的主容器。它包括页眉、页脚和一个动态更新的内容区域。
- **`js/main.js`**：处理路由、内容加载和事件处理。它是应用程序交互性的核心。
- **`pages/`**：包含网站不同部分的内容。使用 `.html` 或 `.md` 可以在内容创建方面提供灵活性。
- **`css/common.css`**：包含全局样式，以确保整个网站具有一致的外观和感觉。
- **`config/config.js`**：管理外部服务配置，例如 EmailJS 的 API 密钥，使它们与主应用程序逻辑分离。

## 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **库**：
  - [Marked.js](https://marked.js.org/)：用于将 Markdown 文件解析为 HTML。
  - [EmailJS](https://www.emailjs.com/)：用于在没有后端服务器的情况下处理联系表单提交。
- **开发工具**：
  - [http-server](https://www.npmjs.com/package/http-server)：一个简单的零配置命令行 HTTP 服务器，用于本地开发。

## 配置

要使用联系表单，您需要配置您的 EmailJS 凭据。

1.  在 [EmailJS](https://www.emailjs.com/) 注册一个免费帐户。
2.  创建一个新的电子邮件服务和一个新的电子邮件模板。
3.  使用您的 `serviceID`、`templateID` 和 `publicKey` 更新 `config/config.js`：

    ```javascript:f:\ProgramFiles\Code\node\personal-portfolio\config\config.js
    const emailConfig = {
        serviceID: 'YOUR_SERVICE_ID',
        templateID: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY'
    };
    ```

## 部署

该项目是一个静态网站，可以部署到任何静态托管提供商。

### 本地开发

要在本地运行项目，您可以使用一个简单的 HTTP 服务器。

1.  确保您已安装 Node.js。
2.  全局安装 `http-server`：
    ```bash
    npm install -g http-server
    ```
3.  导航到项目的根目录并运行服务器：
    ```bash
    http-server
    ```
4.  打开浏览器并访问 `http://localhost:8080`。

### 托管平台

您可以将此网站部署到以下平台：

-   GitHub Pages
-   Netlify
-   Vercel
-   AWS S3

只需将项目目录的内容上传到您选择的托管提供商即可。