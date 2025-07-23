# Logo 组件

这是一个用于显示网站 Logo 的可重用组件。

## 使用方法

此组件通常在网站的 Header 部分使用。它会根据提供的配置动态渲染 Logo 文本和样式。

## 配置

Logo 组件的配置在 `config/config.js` 的 `header.left` 部分定义。

一个典型的配置示例如下：

```javascript
{
    name: 'logo',
    config: {
        text: '我的网站',
        style: 'text-2xl font-bold text-gray-800'
    }
}
```

- `text`: (字符串) 要显示的 Logo 文本。
- `style`: (字符串) 应用于 Logo 的 Tailwind CSS 类名。

## 默认配置

如果未提供特定配置，组件将使用 `components/header/logo/config.js` 中定义的默认配置。

```javascript
// components/header/logo/config.js
window.logoConfig = {
    default: {
        text: '默认Logo',
        style: 'text-xl font-semibold text-gray-600'
    }
};
```