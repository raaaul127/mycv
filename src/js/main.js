// import $ from 'jquery';
// // create global $ and jQuery variables
// global.$ = global.jQuery = $;
import GLightbox from 'glightbox';

(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Intro type effect
     */

    setTimeout(function() {
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }
}, 2000);

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });

    /**
     * Validate Form 
     */

    // (function () {
    //     'use strict';
    //     window.addEventListener('load', function () {
    //       var form = document.getElementById('form');
    //       form.addEventListener('submit', function (event) {
    //         var isValid = true;
    
    //         // Verifică fiecare câmp pentru validitate
    //         var inputs = form.querySelectorAll('input, textarea');
    //         inputs.forEach(function (input) {
    //           if (!input.checkValidity()) {
    //             input.classList.add('is-invalid');
    //             input.classList.remove('is-valid');
    //             isValid = false;
    //           } else {
    //             input.classList.add('is-valid');
    //             input.classList.remove('is-invalid');
    //           }
    //         });
    
    //         if (!isValid) {
    //           event.preventDefault(); // Previi trimiterea formularului
    //         }
    //       }, false);
    //     }, false);
    //   })();

    /**
     * Validate Contact
     */
    (function () {
        'use strict'
        const forms = document.querySelectorAll('.php-email-form')
        Array.from(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
    
                    form.classList.add('was-validated')
                }, false)
            })
    })()

    /**
     * Testimonials slider
     */
    // new Swiper('.testimonials-slider', {
    //   speed: 600,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //   },
    //   slidesPerView: 'auto',
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //   }
    // });

    /**
     * Portfolio details slider
     */
    // new Swiper('.portfolio-details-slider', {
    //   speed: 400,
    //   loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //   }
    // });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }
        // Enable Dark Mode!
        let toggleSwitch = document.getElementById('darkModeIcon');
        let currentTheme = localStorage.getItem('theme');
    
        if (currentTheme && currentTheme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            toggleSwitch.classList.add('bi-moon');
            toggleSwitch.classList.remove('bi-sun');
    
        }
        else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            toggleSwitch.classList.remove('bi-moon');
            toggleSwitch.classList.add('bi-sun');
            localStorage.setItem('theme', 'light');
        }
        function getParticlesColor2() {
            const rootStyles = getComputedStyle(document.documentElement);
            return rootStyles.getPropertyValue("--particle-color").trim();
        }
        function switchTheme(e) {
            currentTheme = localStorage.getItem('theme');
            this.classList.toggle('bi-moon');
            this.classList.toggle('bi-sun');
            if (currentTheme && currentTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                localStorage.setItem('theme', 'light');
    
            }
            else {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            //schimb culoarea in particles.js
            setTimeout(() => {
                const newColor = getParticlesColor2();
    
                // Dacă există o instanță anterioară, o distrugem
                if (window.pJSDom && pJSDom.length > 0) {
                    pJSDom[0].pJS.particles.color.value = newColor;
                    pJSDom[0].pJS.fn.particlesRefresh();
                }
            }, 100); // Mic delay pentru a permite aplicarea noii culori din CSS
        }
        toggleSwitch.addEventListener('click', switchTheme, false);
    
    

    /**
     * Initiate Pure Counter 
     */
    // new PureCounter();

})()