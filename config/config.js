// 网站配置文件
const siteConfig = {
    // 网站基本信息
    site: {
        title: '个人作品集 - 张三',
        description: '这是一个展示个人技能和项目作品的专业作品集网站',
        keywords: '个人作品集,前端开发,项目展示,技能展示',
        logo: '张三的作品集'
    },
    
    // 导航菜单配置
    navigation: [
        {
            name: '首页',
            route: 'pages/home.html',
            type: 'html' // html 或 markdown
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
            // 注意：这个一级菜单没有配置 route，所以点击时会跳转到第一个子菜单
            route: 'pages/projects.html',
            type: 'html',
            // children: [
            //     {
            //         name: 'Web 项目',
            //         route: 'pages/projects/web.html',
            //         type: 'html'
            //     },
            //     {
            //         name: '移动端项目',
            //         route: 'pages/projects/mobile.md',
            //         type: 'markdown'
            //     },
            //     {
            //         name: '开源项目',
            //         route: 'pages/projects/opensource.md',
            //         type: 'markdown'
            //     }
            // ]
        },
        {
            name: '联系我',
            route: 'pages/contact.html',
            type: 'html'
        }
    ],
    
    // 轮播图配置
    carousel: {
        enabled: true, // 是否启用轮播图功能
        autoPlay: true, // 是否自动播放
        interval: 5000, // 自动播放间隔时间（毫秒）
        showDots: true, // 是否显示指示点
        showArrows: true, // 是否显示左右箭头
        images: [
            {
                src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                alt: '现代办公空间',
                title: '创新工作环境',
                description: '在现代化的工作环境中追求卓越'
            },
            {
                src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                alt: '编程代码',
                title: '代码艺术',
                description: '用代码创造无限可能'
            },
            {
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                alt: '团队协作',
                title: '团队合作',
                description: '协作共创美好未来'
            }
        ]
    },

    // 首页内容配置
    homepage: {
        // 欢迎区域
        welcome: {
            title: '欢迎来到我的',
            highlight: '个人作品集',
            description: '我是一名充满热情的开发者，专注于创建优雅、高效的数字解决方案。<br>在这里，您可以了解我的技能、查看我的项目作品，并与我取得联系。'
        },
        
        // 技能展示网格
        skills: [
            {
                icon: 'code',
                title: '前端开发',
                description: '精通现代前端技术栈，包括 HTML5、CSS3、JavaScript、React、Vue.js 等，致力于创建响应式和用户友好的界面。'
            },
            {
                icon: 'server',
                title: '后端开发',
                description: '熟悉服务器端开发，包括 Node.js、Python、数据库设计等，能够构建稳定可靠的后端服务和 API。'
            },
            {
                icon: 'smartphone',
                title: '移动开发',
                description: '具备移动应用开发经验，包括 React Native、Flutter 等跨平台技术，为用户提供优质的移动端体验。'
            }
        ],
        
        // 愿景区域
        vision: {
            title: '让我们一起创造精彩',
            description: '如果您有任何项目想法或合作机会，我很乐意与您交流。让我们一起将创意转化为现实！'
        }
    },

    // Markdown 主题配置
    markdownTheme: {
        // 基础样式配置
        base: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#1f2937',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.08)'
        },
        
        // 标题样式
        headings: {
            h1: {
                fontSize: '2.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid rgba(59, 130, 246, 0.2)',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            },
            h2: {
                fontSize: '1.875rem',
                fontWeight: '600',
                color: '#1f2937',
                marginTop: '2rem',
                marginBottom: '1rem',
                position: 'relative',
                paddingLeft: '1rem'
            },
            h3: {
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#374151',
                marginTop: '1.5rem',
                marginBottom: '0.75rem'
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#4b5563',
                marginTop: '1rem',
                marginBottom: '0.5rem'
            }
        },
        
        // 段落和文本样式
        text: {
            paragraph: {
                marginBottom: '1rem',
                lineHeight: '1.7',
                color: '#374151'
            },
            strong: {
                fontWeight: '600',
                color: '#1f2937'
            },
            emphasis: {
                fontStyle: 'italic',
                color: '#4b5563'
            }
        },
        
        // 列表样式
        lists: {
            ul: {
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
                listStyleType: 'none'
            },
            ol: {
                marginBottom: '1rem',
                paddingLeft: '1.5rem'
            },
            li: {
                marginBottom: '0.5rem',
                position: 'relative',
                paddingLeft: '0.5rem'
            }
        },
        
        // 引用样式
        blockquote: {
            borderLeft: '4px solid #3b82f6',
            paddingLeft: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '0 8px 8px 0',
            fontStyle: 'italic',
            color: '#4b5563',
            backdropFilter: 'blur(8px)'
        },
        
        // 代码样式
        code: {
            inline: {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#1d4ed8',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                border: '1px solid rgba(59, 130, 246, 0.2)'
            },
            block: {
                backgroundColor: '#1f2937',
                color: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.1)'
            }
        },
        
        // 链接样式
        links: {
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent',
            hover: {
                color: '#1d4ed8',
                borderBottomColor: '#3b82f6'
            }
        },
        
        // 表格样式
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.06)',
            th: {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontWeight: '600',
                color: '#1f2937',
                borderBottom: '2px solid rgba(59, 130, 246, 0.2)'
            },
            td: {
                padding: '0.75rem 1rem',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                color: '#374151'
            }
        },
        
        // 图片样式
        images: {
            maxWidth: '100%',
            height: 'auto',
            margin: '0 auto',
            borderRadius: '12px',
            marginBottom: '1rem',
            boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            hover: {
                transform: 'scale(1.02)'
            }
        },
        
        // 分隔线样式
        hr: {
            border: 'none',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
            margin: '2rem 0',
            borderRadius: '1px'
        }
    },

    // 联系我页面配置
    contact: {
        // 描述信息
        description: "我很高兴能与您交流。无论您有项目想法、合作机会，还是只想打个招呼，都欢迎随时联系我。",
        
        // 联系信息
        info: [
            {
                icon: 'mail',
                label: '邮箱',
                value: 'your-email@example.com'
            },
            {
                icon: 'phone',
                label: '电话',
                value: '+1 (234) 567-890'
            },
            {
                icon: 'map-pin',
                label: '位置',
                value: '地球，某个角落'
            }
        ],
        
        // 社交媒体
        social: [
            {
                icon: 'github',
                url: 'https://github.com/your-username'
            },
            {
                icon: 'linkedin',
                url: 'https://linkedin.com/in/your-profile'
            },
            {
                icon: 'twitter',
                url: 'https://twitter.com/your-handle'
            }
        ],
        
        // 邮件发送配置 (EmailJS)
        // 注意：在前端暴露这些信息是不安全的，这里仅为演示目的
        // 在实际应用中，应通过后端服务处理邮件发送
        emailSettings: {
            enabled: true, // 是否启用邮件发送功能
            // EmailJS 配置
            serviceID: '*****', // 替换为您的 EmailJS Service ID
            templateID: '****', // 用于发送给您的邮件模板ID
            publicKey: '*****' // 替换为您的 EmailJS Public Key (User ID)
        },
        
        // 常见问题 (FAQ)
        faq: {
            title: "常见问题",
            items: [
                {
                    icon: 'help-circle',
                    question: "您接受哪些类型的项目？",
                    answer: "我专注于 Web 开发项目，尤其是使用现代 JavaScript 框架（如 React、Vue）构建的单页应用和响应式网站。我也对后端开发和移动应用开发感兴趣。"
                },
                {
                    icon: 'clock',
                    question: "您的工作时间是怎样的？",
                    answer: "我通常在工作日的上午9点到下午6点工作。不过，作为一名灵活的开发者，我可以根据项目需求调整工作时间。"
                },
                {
                    icon: 'dollar-sign',
                    question: "您的收费标准是什么？",
                    answer: "我的收费根据项目的复杂性、范围和所需时间而定。我提供按小时计费和按项目计费两种模式。欢迎与我联系，获取详细报价。"
                },
                {
                    icon: 'briefcase',
                    question: "您是否接受远程工作？",
                    answer: "是的，我完全支持远程工作，并拥有丰富的远程协作经验。我相信地理位置不应成为创造卓越产品的障碍。"
                }
            ]
        }
    },

    // Footer 配置
    footer: {
        // 左侧图片（1-3个，1:1比例）
        images: [
            {
                src: 'assets/images/footer-img1.jpg',
                alt: '认证证书',
                link: '#' // 可选，点击图片的链接
            },
            {
                src: 'assets/images/footer-img2.jpg',
                alt: '获奖证书',
                link: '#'
            }
        ],
        
        // 右侧联系信息
        contact: {
            phone: '+86 138-0000-0000',
            email: 'zhangsan@example.com'
        },
        
        // 二维码图片
        qrCode: {
            src: 'assets/images/qr-code.jpg',
            alt: '微信二维码'
        }
    }
};

// 将配置暴露到全局
window.siteConfig = siteConfig;