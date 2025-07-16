/**
 * 个人作品集网站主类
 * 负责网站的初始化、导航生成、内容加载等核心功能
 */
class PortfolioSite {
    constructor() {
        this.config = window.siteConfig;
        this.currentRoute = null;
        this.isLoading = false;
        this.init();
    }
    
    /**
     * 初始化网站
     * 按顺序执行各项初始化任务
     */
    init() {
        try {
            this.loadSiteConfig();
            this.generateNavigation();
            this.bindEvents();
            this.initCarousel();
            this.loadDefaultContent();
            this.initializeIcons();
        } catch (error) {
            console.error('网站初始化失败:', error);
            this.showError('网站初始化失败，请刷新页面重试。');
        }
    }
    
    /**
     * 初始化 Lucide 图标
     */
    initializeIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    /**
     * 加载网站配置
     * 设置页面标题、meta信息、Logo等基础配置
     */
    loadSiteConfig() {
        if (!this.config || !this.config.site) {
            throw new Error('网站配置文件缺失或格式错误');
        }
        
        const { site, footer } = this.config;
        
        try {
            // 设置页面标题和 meta 信息
            this.setElement('page-title', site.title);
            this.setAttribute('page-description', 'content', site.description);
            this.setAttribute('page-keywords', 'content', site.keywords);
            document.title = site.title;
            
            // 设置 Logo
            this.setElement('site-logo', site.logo);
            
            // 加载 Footer 内容
            if (footer) {
                this.loadFooterContent(footer);
            }
        } catch (error) {
            console.error('加载网站配置失败:', error);
        }
    }
    
    /**
     * 安全设置元素内容
     * @param {string} id - 元素ID
     * @param {string} content - 内容
     */
    setElement(id, content) {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    }
    
    /**
     * 安全设置元素属性
     * @param {string} id - 元素ID
     * @param {string} attr - 属性名
     * @param {string} value - 属性值
     */
    setAttribute(id, attr, value) {
        const element = document.getElementById(id);
        if (element && value) {
            element.setAttribute(attr, value);
        }
    }
    
    /**
     * 生成导航菜单
     * 为桌面端和移动端生成导航HTML结构
     */
    generateNavigation() {
        const desktopNav = document.getElementById('desktop-nav');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (!desktopNav || !mobileNav) {
            console.error('导航元素未找到');
            return;
        }
        
        if (!this.config.navigation || !Array.isArray(this.config.navigation)) {
            console.error('导航配置缺失或格式错误');
            return;
        }
        
        // 生成桌面端导航
        const desktopNavHtml = this.config.navigation.map(item => {
            if (item.children && item.children.length > 0) {
                // 有子菜单的情况
                const childrenHtml = item.children.map(child => 
                    `<a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg" data-route="${child.route}" data-type="${child.type}">${child.name}</a>`
                ).join('');
                
                return `
                    <div class="relative group">
                        <button class="nav-item text-gray-700 hover:text-blue-600 flex items-center" ${item.route ? `data-route="${item.route}" data-type="${item.type}"` : ''}>
                            ${item.name}
                            <i data-lucide="chevron-down" class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute left-0 mt-2 w-48 backdrop-blur-16 bg-white/90 border border-white/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div class="py-2 px-2">
                                ${childrenHtml}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // 没有子菜单的情况
                return `<a href="#" class="nav-item text-gray-700 hover:text-blue-600" data-route="${item.route}" data-type="${item.type}">${item.name}</a>`;
            }
        }).join('');
        
        desktopNav.innerHTML = desktopNavHtml;
        
        // 生成移动端导航
        const mobileNavHtml = this.config.navigation.map(item => {
            if (item.children && item.children.length > 0) {
                const childrenHtml = item.children.map(child => 
                    `<a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg" data-route="${child.route}" data-type="${child.type}">${child.name}</a>`
                ).join('');
                
                return `
                    <div class="space-y-1">
                        <button class="nav-item w-full text-left text-gray-700 hover:text-blue-600 flex items-center justify-between" ${item.route ? `data-route="${item.route}" data-type="${item.type}"` : ''} onclick="toggleMobileSubmenu(this)">
                            ${item.name}
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-200"></i>
                        </button>
                        <div class="hidden pl-4 space-y-1 mt-2">
                            ${childrenHtml}
                        </div>
                    </div>
                `;
            } else {
                return `<a href="#" class="nav-item block text-gray-700 hover:text-blue-600" data-route="${item.route}" data-type="${item.type}">${item.name}</a>`;
            }
        }).join('');
        
        mobileNav.innerHTML = mobileNavHtml;
        
        // 重新初始化图标
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // 创建桌面端导航项
    createDesktopNavItem(item) {
        const li = document.createElement('li');
        li.className = 'relative group';
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200';
        link.textContent = item.name;
        
        // 如果有路由配置，添加点击事件
        if (item.route) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadContent(item.route, item.type);
                this.setActiveNav(link);
            });
        } else if (item.children && item.children.length > 0) {
            // 如果没有路由但有子菜单，点击时跳转到第一个子菜单
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const firstChild = item.children[0];
                this.loadContent(firstChild.route, firstChild.type);
                this.setActiveNav(link);
            });
        }
        
        li.appendChild(link);
        
        // 如果有子菜单，创建下拉菜单
        if (item.children && item.children.length > 0) {
            const dropdown = this.createDropdownMenu(item.children);
            li.appendChild(dropdown);
        }
        
        return li;
    }
    
    // 创建下拉菜单
    createDropdownMenu(children) {
        const dropdown = document.createElement('div');
        dropdown.className = 'absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50';
        
        const ul = document.createElement('ul');
        ul.className = 'py-1';
        
        children.forEach(child => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200';
            link.textContent = child.name;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadContent(child.route, child.type);
                this.setActiveNav(link);
            });
            
            li.appendChild(link);
            ul.appendChild(li);
        });
        
        dropdown.appendChild(ul);
        return dropdown;
    }
    
    // 创建移动端导航项
    createMobileNavItem(item) {
        const div = document.createElement('div');
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200';
        link.textContent = item.name;
        
        if (item.route) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadContent(item.route, item.type);
                this.toggleMobileMenu();
            });
        } else if (item.children && item.children.length > 0) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const firstChild = item.children[0];
                this.loadContent(firstChild.route, firstChild.type);
                this.toggleMobileMenu();
            });
        }
        
        div.appendChild(link);
        
        // 移动端子菜单
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                const childLink = document.createElement('a');
                childLink.href = '#';
                childLink.className = 'block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200';
                childLink.textContent = `- ${child.name}`;
                
                childLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadContent(child.route, child.type);
                    this.toggleMobileMenu();
                });
                
                div.appendChild(childLink);
            });
        }
        
        return div;
    }
    
    // 绑定事件
    bindEvents() {
        // 移动端菜单切换
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // 导航菜单点击事件委托
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-route]');
            if (target) {
                e.preventDefault();
                const route = target.getAttribute('data-route');
                const type = target.getAttribute('data-type');
                
                if (route && type) {
                    this.loadContent(route, type);
                    this.setActiveNav(target);
                    
                    // 如果是移动端菜单，关闭菜单
                    if (target.closest('#mobile-menu')) {
                        this.toggleMobileMenu();
                    }
                }
            }
        });
    }
    
    // 切换移动端菜单
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    }
    
    // 设置活跃导航
    setActiveNav(activeLink) {
        // 移除所有活跃状态
        document.querySelectorAll('#desktop-nav [data-route], #mobile-nav [data-route]').forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold', 'active');
            link.classList.add('text-gray-700');
        });
        
        // 设置当前活跃状态
        activeLink.classList.remove('text-gray-700');
        activeLink.classList.add('text-blue-600', 'font-semibold', 'active');
    }
    
    /**
     * 加载内容
     * @param {string} route - 内容路径
     * @param {string} type - 内容类型 (html/markdown)
     */
    async loadContent(route, type) {
        if (this.isLoading) {
            return; // 防止重复加载
        }
        
        const container = document.getElementById('content-container');
        if (!container) {
            console.error('内容容器未找到');
            return;
        }
        
        this.isLoading = true;
        
        try {
            // 显示加载状态
            this.showLoadingState(container);
            
            const response = await fetch(route);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();

            this.currentRoute = route;

            // 根据类型渲染内容
            this.renderContent(container, content, type, route);
            
        } catch (error) {
            console.error('加载内容失败:', error);
            this.showErrorState(container, error.message);
        } finally {
            this.isLoading = false;
        }
    }
    
    /**
     * 显示加载状态
     * @param {HTMLElement} container - 容器元素
     */
    showLoadingState(container) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mb-4"></div>
                <p class="text-secondary font-medium">加载中...</p>
            </div>
        `;
    }
    
    /**
     * 渲染内容
     * @param {HTMLElement} container - 容器元素
     * @param {string} content - 内容
     * @param {string} type - 内容类型
     */
    renderContent(container, content, type, route) {
        // 保存原始的className，确保不丢失基础样式
        const originalClasses = 'bg-white rounded-lg shadow-sm p-6';
        
        if (type === 'markdown') {
            // 应用markdown主题样式类，同时保留原始样式
            container.className = `${originalClasses} markdown-content`;
            
            // 渲染 Markdown
            if (typeof marked !== 'undefined') {
                container.innerHTML = marked.parse(content);
            } else {
                container.innerHTML = `<pre class="whitespace-pre-wrap font-mono text-sm bg-secondary p-4 rounded-lg">${this.escapeHtml(content)}</pre>`;
            }
            
            // 应用主题配置样式
            this.applyMarkdownTheme(container);
        } else {
            // 恢复原始样式类
            container.className = originalClasses;
            // 直接插入 HTML
            container.innerHTML = content;
        }
        
        // 重新初始化图标
        this.initializeIcons();
        
        // 检查是否需要重新初始化轮播图
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer && this.config.carousel && this.config.carousel.enabled) {
            this.initCarousel();
        }

        // 根据路由加载特定页面的动态内容
        if (route) {
            if (route.includes('home.html')) {
                this.loadHomepageContent();
            } else if (route.includes('contact.html')) {
                this.loadContactContent();
            }
        }
    }
    
    /**
     * 显示错误状态
     * @param {HTMLElement} container - 容器元素
     * @param {string} errorMessage - 错误信息
     */
    showErrorState(container, errorMessage) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="text-red-500 mb-6">
                    <i data-lucide="alert-circle" class="w-16 h-16 mx-auto"></i>
                </div>
                <h3 class="text-xl font-semibold text-primary mb-3">内容加载失败</h3>
                <p class="text-secondary mb-4 max-w-md">无法加载请求的内容，请检查网络连接或文件路径是否正确。</p>
                <p class="text-sm text-muted bg-tertiary px-4 py-2 rounded-lg font-mono">${this.escapeHtml(errorMessage)}</p>
                <button onclick="location.reload()" class="btn btn-primary mt-6">
                    <i data-lucide="refresh-cw" class="w-4 h-4 mr-2"></i>
                    重新加载
                </button>
            </div>
        `;
        
        this.initializeIcons();
    }
    
    /**
     * 转义HTML字符
     * @param {string} text - 需要转义的文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * 显示通用错误信息
     * @param {string} message - 错误信息
     */
    showError(message) {
        const container = document.getElementById('content-container');
        if (container) {
            this.showErrorState(container, message);
        } else {
            alert(message);
        }
    }
    
    // 加载默认内容
    async loadDefaultContent() {
        const firstNavItem = this.config.navigation[0];
        if (firstNavItem && firstNavItem.route) {
            this.currentRoute = firstNavItem.route;
            try {
                const response = await fetch(firstNavItem.route);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const content = await response.text();
                 const container = document.getElementById('content-container');
                 this.renderContent(container, content, firstNavItem.type, firstNavItem.route);
            } catch (error) {
                console.error('加载默认内容失败:', error);
                this.showError('无法加载默认内容。');
            }
        }
    }
    
    /**
     * 初始化轮播图
     */
    initCarousel() {
        if (!this.config.carousel || !this.config.carousel.enabled) {
            return;
        }
        
        const carouselContainer = document.getElementById('carousel-container');
        if (!carouselContainer) {
            return;
        }
        
        // 显示轮播图容器
        carouselContainer.style.display = 'block';
        
        // 初始化轮播图数据
        this.carousel = {
            currentIndex: 0,
            images: this.config.carousel.images || [],
            autoPlayTimer: null,
            isPlaying: this.config.carousel.autoPlay || false,
            interval: this.config.carousel.interval || 5000
        };
        
        // 生成轮播图内容
        this.generateCarouselSlides();
        this.generateCarouselDots();
        
        // 绑定事件
        this.bindCarouselEvents();
        
        // 启动自动播放
        if (this.carousel.isPlaying) {
            this.startAutoPlay();
        }
        
        // 初始化图标
        this.initializeIcons();
    }
    
    /**
     * 生成轮播图幻灯片
     */
    generateCarouselSlides() {
        const slidesContainer = document.getElementById('carousel-slides');
        if (!slidesContainer || !this.carousel.images.length) {
            return;
        }
        
        const slidesHtml = this.carousel.images.map((image, index) => `
            <div class="carousel-slide" data-index="${index}">
                <img src="${image.src}" alt="${image.alt || ''}" loading="${index === 0 ? 'eager' : 'lazy'}">
                <div class="carousel-slide-content">
                    ${image.title ? `<h3 class="carousel-slide-title">${image.title}</h3>` : ''}
                    ${image.description ? `<p class="carousel-slide-description">${image.description}</p>` : ''}
                </div>
            </div>
        `).join('');
        
        slidesContainer.innerHTML = slidesHtml;
    }
    
    /**
     * 生成轮播图指示点
     */
    generateCarouselDots() {
        const dotsContainer = document.getElementById('carousel-dots');
        if (!dotsContainer || !this.carousel.images.length || !this.config.carousel.showDots) {
            return;
        }
        
        const dotsHtml = this.carousel.images.map((_, index) => `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="跳转到第${index + 1}张图片"></button>
        `).join('');
        
        dotsContainer.innerHTML = dotsHtml;
    }
    
    /**
     * 绑定轮播图事件
     */
    bindCarouselEvents() {
        // 绑定箭头按钮事件
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        if (prevBtn && this.config.carousel.showArrows) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        } else if (prevBtn) {
            prevBtn.style.display = 'none';
        }
        
        if (nextBtn && this.config.carousel.showArrows) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        } else if (nextBtn) {
            nextBtn.style.display = 'none';
        }
        
        // 绑定指示点事件
        const dotsContainer = document.getElementById('carousel-dots');
        if (dotsContainer) {
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('carousel-dot')) {
                    const index = parseInt(e.target.dataset.index);
                    this.goToSlide(index);
                }
            });
        }
        
        // 鼠标悬停时暂停自动播放
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => {
                if (this.config.carousel.autoPlay) {
                    this.startAutoPlay();
                }
            });
        }
        
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    /**
     * 跳转到指定幻灯片
     * @param {number} index - 幻灯片索引
     */
    goToSlide(index) {
        if (!this.carousel || index < 0 || index >= this.carousel.images.length) {
            return;
        }
        
        this.carousel.currentIndex = index;
        
        // 更新幻灯片位置
        const slidesContainer = document.getElementById('carousel-slides');
        if (slidesContainer) {
            const translateX = -index * 100;
            slidesContainer.style.transform = `translateX(${translateX}%)`;
        }
        
        // 更新指示点状态
        this.updateDots();
    }
    
    /**
     * 上一张幻灯片
     */
    prevSlide() {
        if (!this.carousel) return;
        
        const newIndex = this.carousel.currentIndex === 0 
            ? this.carousel.images.length - 1 
            : this.carousel.currentIndex - 1;
        
        this.goToSlide(newIndex);
    }
    
    /**
     * 下一张幻灯片
     */
    nextSlide() {
        if (!this.carousel) return;
        
        const newIndex = this.carousel.currentIndex === this.carousel.images.length - 1 
            ? 0 
            : this.carousel.currentIndex + 1;
        
        this.goToSlide(newIndex);
    }
    
    /**
     * 更新指示点状态
     */
    updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === this.carousel.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * 开始自动播放
     */
    startAutoPlay() {
        if (!this.carousel || !this.carousel.isPlaying) return;
        
        this.pauseAutoPlay(); // 清除现有定时器
        
        this.carousel.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.carousel.interval);
    }
    
    /**
     * 暂停自动播放
     */
    pauseAutoPlay() {
        if (this.carousel && this.carousel.autoPlayTimer) {
            clearInterval(this.carousel.autoPlayTimer);
            this.carousel.autoPlayTimer = null;
        }
    }
    
    /**
     * 加载首页动态内容
     */
    loadHomepageContent() {
        // 检查是否存在首页配置和相关元素
        if (!this.config.homepage) {
            return;
        }
        
        // 加载欢迎区域内容
        this.loadWelcomeContent();
        
        // 加载技能展示网格
        this.loadSkillsGrid();
        
        // 加载愿景区域内容
        this.loadVisionContent();
    }
    
    /**
     * 加载欢迎区域内容
     */
    loadWelcomeContent() {
        const welcomeConfig = this.config.homepage.welcome;
        if (!welcomeConfig) return;
        
        const titleElement = document.getElementById('welcome-title');
        const highlightElement = document.getElementById('welcome-highlight');
        const descriptionElement = document.getElementById('welcome-description');
        
        if (titleElement && welcomeConfig.title) {
            titleElement.childNodes[0].textContent = welcomeConfig.title;
        }
        
        if (highlightElement && welcomeConfig.highlight) {
            highlightElement.textContent = welcomeConfig.highlight;
        }
        
        if (descriptionElement && welcomeConfig.description) {
            descriptionElement.innerHTML = welcomeConfig.description;
        }
    }
    
    /**
     * 加载技能展示网格
     */
    loadSkillsGrid() {
        const skillsConfig = this.config.homepage.skills;
        if (!skillsConfig || !Array.isArray(skillsConfig)) return;
        
        const skillsGridElement = document.getElementById('skills-grid');
        if (!skillsGridElement) return;
        
        // 根据技能数量动态设置网格列数
        const skillsCount = skillsConfig.length;
        let gridCols = 'md:grid-cols-3';
        if (skillsCount === 1) {
            gridCols = 'md:grid-cols-1';
        } else if (skillsCount === 2) {
            gridCols = 'md:grid-cols-2';
        } else if (skillsCount === 4) {
            gridCols = 'md:grid-cols-2 lg:grid-cols-4';
        } else if (skillsCount >= 5) {
            gridCols = 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        }
        
        // 更新网格类名
        skillsGridElement.className = `grid ${gridCols} gap-8 mb-12`;
        skillsGridElement.id = 'skills-grid';
        
        // 生成技能卡片HTML
        const skillsHtml = skillsConfig.map(skill => `
            <div class="card text-center">
                <div class="text-blue-600 mb-4">
                    <i data-lucide="${skill.icon}" class="w-12 h-12 mx-auto"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">${skill.title}</h3>
                <p class="text-gray-600">
                    ${skill.description}
                </p>
            </div>
        `).join('');
        
        skillsGridElement.innerHTML = skillsHtml;
        
        // 重新初始化图标
        this.initializeIcons();
    }
    
    /**
     * 加载愿景区域内容
     */
    loadVisionContent() {
        const visionConfig = this.config.homepage.vision;
        if (!visionConfig) return;
        
        const titleElement = document.getElementById('vision-title');
        const descriptionElement = document.getElementById('vision-description');
        
        if (titleElement && visionConfig.title) {
            titleElement.textContent = visionConfig.title;
        }
        
        if (descriptionElement && visionConfig.description) {
            descriptionElement.textContent = visionConfig.description;
        }
    }

    /**
     * 加载联系页面内容
     */
    loadContactContent() {
        if (!this.config.contact) return;

        const contactConfig = this.config.contact;

        // 加载描述信息
        this.setElement('contact-description', contactConfig.description);

        // 加载联系信息
        this.loadContactInfo(contactConfig.info);

        // 加载社交媒体链接
        this.loadSocialMedia(contactConfig.social);

        // 加载常见问题
        this.loadFaq(contactConfig.faq);

        // 绑定表单提交事件
        this.bindContactForm(contactConfig.emailSettings);
        
        this.initializeIcons();
    }

    /**
     * 加载联系信息
     */
    loadContactInfo(info) {
        const container = document.getElementById('contact-info-container');
        if (!container || !info) return;

        container.innerHTML = info.map(item => `
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i data-lucide="${item.icon}" class="w-6 h-6 text-blue-600"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-medium text-gray-900">${item.label}</h3>
                    <p class="text-gray-600">${item.value}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * 加载社交媒体链接
     */
    loadSocialMedia(social) {
        const container = document.getElementById('social-media-container');
        if (!container || !social) return;

        container.innerHTML = social.map(item => `
            <a href="${item.url}" target="_blank" 
               class="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
            </a>
        `).join('');
    }

    /**
     * 加载常见问题
     */
    loadFaq(faq) {
        const titleElement = document.getElementById('faq-title');
        const container = document.getElementById('faq-container');
        if (!container || !faq) return;

        if (titleElement) {
            titleElement.textContent = faq.title;
        }

        container.innerHTML = faq.items.map(item => `
            <div class="card">
                <h3 class="text-lg font-medium text-gray-900 mb-3">
                    <i data-lucide="${item.icon}" class="w-5 h-5 inline mr-2 text-blue-600"></i>
                    ${item.question}
                </h3>
                <p class="text-gray-600">${item.answer}</p>
            </div>
        `).join('');
    }

    /**
     * 绑定联系表单提交事件
     */
    bindContactForm(emailSettings) {
        const form = document.getElementById('contact-form');
        if (!form || !emailSettings || !emailSettings.enabled) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const messageDiv = document.getElementById('form-message');
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            const setButtonLoading = (loading) => {
                if (loading) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = `
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        发送中...
                    `;
                } else {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            };

            setButtonLoading(true);

            emailjs.sendForm(emailSettings.serviceID, emailSettings.templateID, form, emailSettings.publicKey)
                .then(() => {
                    console.log('邮件发送成功!');
                    messageDiv.innerHTML = `
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div class="flex items-center">
                                <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mr-2"></i>
                                <span class="text-green-800 font-medium">消息发送成功！</span>
                            </div>
                            <p class="text-green-700 mt-2">感谢您的消息，我们会尽快与您联系。</p>
                        </div>
                    `;
                    form.reset();
                })
                .catch((error) => {
                    console.error('邮件发送过程中发生错误:', error);
                    messageDiv.innerHTML = `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div class="flex items-center">
                                <i data-lucide="alert-circle" class="w-5 h-5 text-red-600 mr-2"></i>
                                <span class="text-red-800 font-medium">消息发送失败！</span>
                            </div>
                            <p class="text-red-700 mt-2">抱歉，邮件发送失败，请检查您的EmailJS配置或稍后重试。</p>
                        </div>
                    `;
                })
                .finally(() => {
                    setButtonLoading(false);
                    messageDiv.classList.remove('hidden');
                    this.initializeIcons();
                });
        });
    }



    // 加载 Footer 内容
    loadFooterContent(footerConfig) {
        // 加载左侧图片（大小扩大一倍）
        const footerImages = document.getElementById('footer-images');
        footerImages.innerHTML = '';
        
        if (footerConfig.images && footerConfig.images.length > 0) {
            footerConfig.images.forEach(img => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'w-24 h-24 bg-gray-200 rounded overflow-hidden group relative';
                
                if (img.link) {
                    const link = document.createElement('a');
                    link.href = img.link;
                    link.target = '_blank';
                    
                    const image = document.createElement('img');
                    image.src = img.src;
                    image.alt = img.alt;
                    image.className = 'w-full h-full object-cover hover:opacity-80 transition-all duration-300 group-hover:scale-105';
                    image.onerror = () => {
                        image.style.display = 'none';
                        imgContainer.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-500">图片</div>';
                    };
                    
                    link.appendChild(image);
                    imgContainer.appendChild(link);
                } else {
                    const image = document.createElement('img');
                    image.src = img.src;
                    image.alt = img.alt;
                    image.className = 'w-full h-full object-cover transition-all duration-300 group-hover:scale-105';
                    image.onerror = () => {
                        image.style.display = 'none';
                        imgContainer.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-500">图片</div>';
                    };
                    
                    imgContainer.appendChild(image);
                }
                
                footerImages.appendChild(imgContainer);
            });
        }
        
        // 加载联系信息
        const contactInfo = document.getElementById('footer-contact');
        contactInfo.innerHTML = `
            <div class="text-sm text-gray-600">
                <div class="flex items-center justify-center md:justify-end space-x-2">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                    <span>${footerConfig.contact.phone}</span>
                </div>
                <div class="flex items-center justify-center md:justify-end space-x-2">
                    <i data-lucide="mail" class="w-4 h-4"></i>
                    <span>${footerConfig.contact.email}</span>
                </div>
            </div>
        `;
        
        // 加载二维码（可选显示）
        const qrCode = document.getElementById('footer-qrcodes');
        const qrCodeContainer = document.getElementById('footer-qrcode-container');
        
        if (footerConfig.qrCode && footerConfig.qrCode.src) {
            qrCode.innerHTML = '';
            
            const qrContainer = document.createElement('div');
            qrContainer.className = 'w-16 h-16 bg-gray-200 rounded overflow-hidden';
            
            const qrImage = document.createElement('img');
            qrImage.src = footerConfig.qrCode.src;
            qrImage.alt = footerConfig.qrCode.alt;
            qrImage.className = 'w-full h-full object-cover rounded transition-all duration-300 hover:scale-105';
            qrImage.onerror = () => {
                qrContainer.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-500 rounded">二维码</div>';
            };
            
            qrContainer.appendChild(qrImage);
            qrCode.appendChild(qrContainer);
            
            if (qrCodeContainer) {
                qrCodeContainer.style.display = 'flex';
            }
        } else {
            if (qrCodeContainer) {
                qrCodeContainer.style.display = 'none';
            }
        }
        
        // 重新初始化图标
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    /**
     * 应用Markdown主题样式
     * @param {HTMLElement} container - 容器元素
     */
    applyMarkdownTheme(container) {
        if (!this.config.markdownTheme) return;
        
        const theme = this.config.markdownTheme;
        
        // 应用基础样式
        if (theme.base) {
            Object.assign(container.style, theme.base);
        }
        
        // 应用各元素样式
        const applyElementStyles = (selector, styles) => {
            if (!styles) return;
            const elements = container.querySelectorAll(selector);
            elements.forEach(element => {
                Object.assign(element.style, styles);
            });
        };
        
        // 应用标题样式
        if (theme.headings) {
            applyElementStyles('h1', theme.headings.h1);
            applyElementStyles('h2', theme.headings.h2);
            applyElementStyles('h3', theme.headings.h3);
            applyElementStyles('h4', theme.headings.h4);
            applyElementStyles('h5', theme.headings.h5);
            applyElementStyles('h6', theme.headings.h6);
        }
        
        // 应用文本样式
        if (theme.text) {
            applyElementStyles('p', theme.text.paragraph);
            applyElementStyles('strong', theme.text.strong);
            applyElementStyles('em', theme.text.emphasis);
        }
        
        // 应用列表样式
        if (theme.lists) {
            applyElementStyles('ul', theme.lists.unordered);
            applyElementStyles('ol', theme.lists.ordered);
            applyElementStyles('li', theme.lists.item);
        }
        
        // 应用引用样式
        if (theme.blockquote) {
            applyElementStyles('blockquote', theme.blockquote);
        }
        
        // 应用代码样式
        if (theme.code) {
            applyElementStyles('code', theme.code.inline);
            applyElementStyles('pre', theme.code.block);
        }
        
        // 应用链接样式
        if (theme.links) {
            applyElementStyles('a', theme.links);
        }
        
        // 应用表格样式
        if (theme.table) {
            applyElementStyles('table', theme.table.table);
            applyElementStyles('th', theme.table.header);
            applyElementStyles('td', theme.table.cell);
        }
        
        // 应用图片样式
        if (theme.images) {
            applyElementStyles('img', theme.images);
        }
        
        // 应用分隔线样式
        if (theme.hr) {
            applyElementStyles('hr', theme.hr);
        }
    }
}

// 移动端子菜单切换函数
function toggleMobileSubmenu(button) {
    const submenu = button.nextElementSibling;
    const icon = button.querySelector('[data-lucide="chevron-down"]');
    
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        submenu.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioSite = new PortfolioSite();
});

// 如果DOM已经加载完成，直接初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioSite = new PortfolioSite();
    });
} else {
    // DOM已经加载完成
    window.portfolioSite = new PortfolioSite();
}