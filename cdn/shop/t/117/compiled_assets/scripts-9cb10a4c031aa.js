(function() {
    var __sections__ = {};
    (function() {
        for (var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
            __sections__[s[i]] = true;
    })();
    (function() {
        if (!__sections__["brand-tab-block"] && !window.DesignMode) return;
        try {

            class BrandsTab extends HTMLElement {
                constructor() {
                    super();
                    this.tabTitle = this.querySelector('.tab-title');
                    this.tabContent = this.querySelector('.tab-panel-content');
                    const ele = this.querySelectorAll('[tab-title-action]');
                    const actionLoadMore = this.querySelectorAll('[data-load-more-block]');
                    this.widthWindow = 0;
                    if (ele.length) {
                        ele.forEach((button) => button.addEventListener('click', this.onActive.bind(this)));
                    }
                    if (actionLoadMore.length) {
                        actionLoadMore.forEach((button) => button.addEventListener('click', this.onLoadMore.bind(this)));
                    }
                }

                onActive(e) {
                    this.tabTitle.querySelector('.active').classList.remove('active');
                    this.tabContent.querySelector('.active').classList.remove('active');
                    this.querySelector(e.target.dataset.target).classList.add('active');
                    e.target.parentElement.classList.add('active');
                }
                onLoadMore(e) {
                    this.resize();
                    if (this.widthWindow > 1024) {
                        var eleHide = (e.target.parentElement).querySelectorAll('.hidden-lg');
                        var _number = e.target.dataset.rowlg;
                        var _class = 'hidden-lg';

                    } else if (this.widthWindow > 551) {
                        var eleHide = (e.target.parentElement).querySelectorAll('.hidden-md');
                        var _number = 9;
                        var _class = 'hidden-md';
                    } else {
                        var eleHide = (e.target.parentElement).querySelectorAll('.hidden-sm');
                        var _number = 6;
                        var _class = 'hidden-sm';
                    }
                    if (eleHide.length) {
                        // let number_show = (eleHide.length > number ? number : eleHide.length);
                        if (e.target.classList.contains('more')) {
                            for (let i = 0; i < eleHide.length; i++) {
                                eleHide[i].classList.remove('show');
                            }
                            e.target.querySelector('span').textContent = e.target.dataset.buttonmore;
                            e.target.classList.remove('more');
                        } else {
                            for (let i = 0; i < eleHide.length; i++) {
                                eleHide[i].classList.add('show');
                            }
                            e.target.querySelector('span').textContent = e.target.dataset.buttonless;
                            e.target.classList.add('more');
                        }

                        // (eleHide.length > _number ? '' : e.target.classList.add('hidden'));
                    }
                }
                resize() {
                    this.widthWindow = window.innerWidth;
                }
            }
            customElements.define('brand-tab', BrandsTab);

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-mobile"]) return;
        try {

            class StickyHeaderMobile extends HTMLElement {
                constructor() {
                    super();
                }

                connectedCallback() {
                    this.header = document.querySelector('.section-header-mobile');
                    this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always' || this.getAttribute('data-sticky-type') === 'reduce-logo-size';
                    this.headerBounds = {};

                    if (this.headerIsAlwaysSticky) {
                        this.header.classList.add('shopify-section-header-sticky');
                    };

                    this.currentScrollTop = 0;
                    this.preventReveal = false;
                    this.predictiveSearch = this.querySelector('predictive-search');

                    this.onScrollHandler = this.onScroll.bind(this);
                    this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                    this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                    window.addEventListener('scroll', this.onScrollHandler, false);

                    this.createObserver();
                }

                disconnectedCallback() {
                    this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                    window.removeEventListener('scroll', this.onScrollHandler);
                }

                createObserver() {
                    let observer = new IntersectionObserver((entries, observer) => {
                        this.headerBounds = entries[0].intersectionRect;
                        observer.disconnect();
                    });

                    observer.observe(this.header);
                }

                onScroll() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

                    if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                        this.header.classList.add('scrolled-past-header');
                        if (this.preventHide) return;
                        requestAnimationFrame(this.hide.bind(this));
                    } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                        this.header.classList.add('scrolled-past-header');
                        if (!this.preventReveal) {
                            requestAnimationFrame(this.reveal.bind(this));
                        } else {
                            window.clearTimeout(this.isScrolling);

                            this.isScrolling = setTimeout(() => {
                                this.preventReveal = false;
                            }, 66);

                            requestAnimationFrame(this.hide.bind(this));
                        }
                    } else if (scrollTop <= this.headerBounds.top) {
                        this.header.classList.remove('scrolled-past-header');
                        requestAnimationFrame(this.reset.bind(this));
                    }

                    this.currentScrollTop = scrollTop;
                }

                hide() {
                    if (this.headerIsAlwaysSticky) return;
                    this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                    this.header.style.top = '';
                }

                reveal() {
                    const headerMultiSite = document.querySelector('.section-header-nav-multi-site');
                    if (this.headerIsAlwaysSticky) return;
                    this.header.classList.add('shopify-section-header-sticky', 'animate');
                    this.header.classList.remove('shopify-section-header-hidden');
                    if (headerMultiSite) {
                        const height = headerMultiSite.offsetHeight;
                        this.header.style.top = `${height}px`;
                    }
                }

                reset() {
                    if (this.headerIsAlwaysSticky) return;
                    this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
                    this.header.style.top = '';
                }
            }

            customElements.define('sticky-header-mobile', StickyHeaderMobile);

            document.querySelector('[data-mobile-menu]').addEventListener('click', () => {
                document.body.classList.toggle('menu_open');
            })

            function setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                const expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            };

            function renderLogoMobile() {
                if ($("[data-menu-tab]").length > 0) {

                    $(document).on("click", "[data-menu-tab] li", (event) => {
                        var active = $(event.currentTarget).data("load-page"),
                            href = $(event.currentTarget).attr("href");

                        $.cookie("page-url", active, {
                            expires: 1,
                            path: "/",
                        });
                    });

                    var canonical = $("[canonical-shop-url]").attr("canonical-shop-url"),
                        pageUrl = $.cookie("page-url"),
                        menuTabItem,
                        logoTabItem,
                        menuItem;

                    if (
                        window.location.pathname.indexOf("/pages/") !== -1 &&
                        window.page_active &&
                        window.page_active != pageUrl
                    ) {
                        setCookie("page-url", window.page_active, 1);
                        pageUrl = window.page_active;
                    }

                    if (pageUrl != null) {
                        menuTabItem = $(`[data-load-page="${pageUrl}"]`);
                        logoTabItem = $(`[data-load-logo-page="${pageUrl}"]`);
                        menuItem = $(`[data-load-menu-page="${pageUrl}"]`);
                    } else {
                        menuTabItem = $("[data-load-page].is-active");
                        logoTabItem = $("[data-load-logo-page].first");
                        menuItem = $("[data-load-menu-page].is-active");
                    }

                    var menuTab = menuTabItem.closest("[data-menu-tab]");

                    menuTab
                        .find("[data-load-page]")
                        .not(menuTabItem)
                        .removeClass("is-active");
                    logoTabItem.siblings().removeClass("is-active");
                    menuItem.siblings().removeClass("is-active");
                    if (pageUrl != "") {
                        logoTabItem.addClass("is-active");
                        menuTabItem.addClass("is-active");
                        menuItem.addClass("is-active");
                    } else {
                        $("[data-load-page]:nth-child(1)").addClass("is-active");
                        $("[data-load-logo-page]:nth-child(1)").addClass("is-active");
                        $("[data-load-menu-page]:nth-child(1)").addClass("is-active");
                    }

                    const header = menuTabItem.closest(".header");


                    if (header && window.innerWidth < 1025) {
                        if (
                            window.location.pathname.indexOf("/pages/") !== -1 &&
                            window.page_active &&
                            window.page_active != pageUrl
                        ) {
                            setCookie("page-url", window.page_active, 1);
                            pageUrl = window.page_active;
                        }

                        const logoMobile = $(".header-mobile .header__heading-link");
                        const logDesktop = header.find(".header__heading-link.is-active");

                        if (logDesktop.data("logo-mobile") == undefined) {
                            logoMobile.find("img").addClass("logo-show");
                            return;
                        } else {
                            logoMobile.html(
                                `<img src="${logDesktop.data(
                        "logo-mobile"
                    )}" alt="${logDesktop.data(
                        "logo-mobile-alt"
                    )}" style="max-width: ${logoMobile.data(
                        "logo-width"
                    )}px; height: auto"/>`
                            );

                            logoMobile.find("img").addClass("logo-show");
                            if (pageUrl != "" && pageUrl != null)
                                logoMobile.attr("href", pageUrl);
                        }
                    }
                }
            }

            renderLogoMobile();

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-nav-multi-site"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-multi-site');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }
                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');
                        this.headerBounds = {};
                        this.setHeaderHeight();
                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));
                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };
                        this.currentScrollTop = 0;
                        this.preventReveal = false;
                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;
                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);
                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });
                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');
                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);
                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);
                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }
                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }
                document.addEventListener('DOMContentLoaded', () => {
                    customElements.define('sticky-header', StickyHeader)
                });
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-basic"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-basic');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }
                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-compact"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-compact');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }
                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-full-elements"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-full-elements');
            if (sticky != undefined || sticky != null) {
                console.log("sticky full: " + sticky)

                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }

                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-hamburger"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-hamburger');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');
                        this.headerBounds = {};
                        this.setHeaderHeight();
                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));
                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };
                        this.currentScrollTop = 0;
                        this.preventReveal = false;
                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;
                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('load', this.checkLoadPosition.bind(this));
                        window.addEventListener('scroll', this.onScrollHandler, false);
                        this.createObserver();
                    }
                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }
                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('load', this.checkLoadPosition);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }
                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });
                        observer.observe(this.header);
                    }
                    checkLoadPosition() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const headerGr = document.querySelectorAll(".shopify-section-group-header-group");

                        if (headerGr[0].classList.contains('shopify-section-header-sticky')) {
                            if (scrollTop > headerGr[0].offsetHeight && !this.header.classList.contains('scrolled-past-header')) {
                                this.header.classList.add('shopify-section-header-hidden');
                            }
                        } else {
                            headerGr.forEach(item => {
                                if (item.classList.contains('shopify-section-header-sticky')) {
                                    const itemPrev = item.previousElementSibling;
                                    const itemPrevHeight = itemPrev.offsetHeight;
                                    const itemPrevTop = itemPrev.offsetTop;

                                    if (scrollTop > itemPrevTop + itemPrevHeight && !this.header.classList.contains('scrolled-past-header')) {
                                        this.header.classList.add('shopify-section-header-hidden');
                                    }
                                }
                            });
                        }
                    }
                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');
                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);
                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }
                        this.currentScrollTop = scrollTop;
                    }
                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                                document.querySelector('body').classList.add("section-header-is-hidden")
                            }
                        }
                        this.closeMenuDisclosure();
                    }
                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                                document.querySelector('body').classList.remove("section-header-is-hidden")
                            }
                        }
                    }
                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                                document.querySelector('body').classList.remove("section-header-is-hidden")
                            }
                        }
                    }
                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }
                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-left-aligned"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-left-aligned');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }

                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-plain"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-plain');

            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            document.body.classList.add('scrolled-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');
                            document.body.classList.add('scrolled-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            document.body.classList.remove('scrolled-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }

                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-utility"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-utility');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }

                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["header-navigation-vertical-menu"] && !window.DesignMode) return;
        try {

            var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-vertical-menu');
            if (sticky != undefined || sticky != null) {
                class StickyHeader extends HTMLElement {
                    constructor() {
                        super();
                    }

                    connectedCallback() {
                        this.header = document.querySelector('.section-header-navigation');
                        this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

                        this.headerBounds = {};

                        this.setHeaderHeight();

                        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                        if (this.headerIsAlwaysSticky) {
                            this.header.classList.add('shopify-section-header-sticky');
                        };

                        this.currentScrollTop = 0;
                        this.preventReveal = false;

                        this.onScrollHandler = this.onScroll.bind(this);
                        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.addEventListener('scroll', this.onScrollHandler, false);

                        this.createObserver();
                    }

                    setHeaderHeight() {
                        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
                    }

                    disconnectedCallback() {
                        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                        window.removeEventListener('scroll', this.onScrollHandler);
                    }

                    createObserver() {
                        let observer = new IntersectionObserver((entries, observer) => {
                            this.headerBounds = entries[0].intersectionRect;
                            observer.disconnect();
                        });

                        observer.observe(this.header);
                    }

                    onScroll() {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            if (this.preventHide) return;
                            this.header.classList.add('scrolled-past-header');
                            requestAnimationFrame(this.hide.bind(this));
                        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                            this.header.classList.add('scrolled-past-header');

                            if (!this.preventReveal) {
                                requestAnimationFrame(this.reveal.bind(this));
                            } else {
                                window.clearTimeout(this.isScrolling);

                                this.isScrolling = setTimeout(() => {
                                    this.preventReveal = false;
                                }, 66);

                                requestAnimationFrame(this.hide.bind(this));
                            }
                        } else if (scrollTop <= this.headerBounds.top) {
                            this.header.classList.remove('scrolled-past-header');
                            requestAnimationFrame(this.reset.bind(this));
                        }

                        this.currentScrollTop = scrollTop;
                    }

                    hide() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                                this.header.classList.remove('shopify-section-header-show');
                            }
                            if (!$('.vertical-menu').hasClass('vertical-menu__style_3')) {
                                $('.vertical-menu').addClass('vertical-menu__hide');
                            }
                        }
                        this.closeMenuDisclosure();
                    }

                    reveal() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
                                this.header.classList.remove('shopify-section-header-hidden');
                            }
                        }
                    }

                    reset() {
                        if (this.headerIsAlwaysSticky != null) {
                            if (this.headerIsAlwaysSticky === 'always') {
                                this.header.classList.add('shopify-section-header-sticky', 'animate');
                                return
                            } else {
                                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
                            }
                            if (!$('.vertical-menu').hasClass('vertical-menu__style_3')) {
                                if (document.body.classList.contains('template-index')) {
                                    if ($('.vertical-menu').hasClass('vertical-menu__hide')) {
                                        $('.vertical-menu').removeClass('vertical-menu__hide');
                                    }
                                }
                            }
                        }
                    }

                    closeMenuDisclosure() {
                        this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
                        this.disclosures.forEach(disclosure => disclosure.close());
                    }
                }

                customElements.define('sticky-header', StickyHeader);
            }

        } catch (e) {
            console.error(e);
        }
    })();
})();