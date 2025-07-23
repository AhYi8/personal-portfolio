// components/header/navigation/config.js
window.navigationConfig = {
    default: {
        items: [
            {
                name: '首页',
                route: 'pages/home.html',
                type: 'html'
            },
            {
                name: '关于我',
                route: 'pages/about.md',
                type: 'markdown'
            },
            {
                name: '技能展示',
                route: 'pages/skills.html',
                type: 'html',
                children: [
                    {
                        name: '前端技能',
                        route: 'pages/skills/frontend.md',
                        type: 'markdown'
                    },
                    {
                        name: '后端技能',
                        route: 'pages/skills/backend.md',
                        type: 'markdown'
                    },
                    {
                        name: '工具使用',
                        route: 'pages/skills/tools.md',
                        type: 'markdown'
                    }
                ]
            },
            {
                name: '项目作品',
                route: 'pages/projects.html',
                type: 'html',
            },
            {
                name: '联系我',
                route: 'pages/contact.html',
                type: 'html'
            }
        ]
    }
};