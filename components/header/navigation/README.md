# Navigation 组件

这是一个用于生成网站导航菜单的可重用组件，同时支持桌面和移动端视图。

## 使用方法

此组件通常在网站的 Header 部分使用。它会根据提供的配置动态生成一个响应式的导航菜单。

## 配置

导航组件的配置在 `config/config.js` 的 `header.right` 部分定义。

一个典型的配置示例如下：

```javascript
{
    name: 'navigation',
    config: {
        items: [
            { name: '首页', route: 'home.html', type: 'page' },
            {
                name: '关于',
                type: 'dropdown',
                children: [
                    { name: '关于我们', route: 'about.md', type: 'page' },
                    { name: '联系方式', route: 'contact.html', type: 'page' }
                ]
            }
        ]
    }
}
```

- `items`: (数组) 一个包含导航项对象的数组。
  - `name`: (字符串) 菜单项显示的名称。
  - `route`: (字符串) 点击菜单项时加载的内容的路径。对于下拉菜单，此字段可省略。
  - `type`: (字符串) 菜单项的类型。可以是 `page`（链接到页面）或 `dropdown`（包含子菜单）。
  - `children`: (数组) 一个包含子菜单项对象的数组，仅当 `type` 为 `dropdown` 时使用。

## 默认配置

如果未提供特定配置，组件将使用 `components/header/navigation/config.js` 中定义的默认配置。

```javascript
// components/header/navigation/config.js
window.navigationConfig = {
    default: {
        items: [
            { name: '默认首页', route: 'home.html', type: 'page' }
        ]
    }
};
```