document.addEventListener("DOMContentLoaded", function() {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        var topBar = document.getElementById('topbar');
        var navBar = document.getElementById('navbar');

        if (window.scrollY == 0) {
            topBar.style.marginTop  = '0';
            navBar.style.backgroundColor = 'Transparent';
            navBar.style.height = "120px";
        } else {
            topBar.style.marginTop  = '-' + topBar.offsetHeight + 'px';
            navBar.style.backgroundColor = "var(--background-one)";
            navBar.style.height = "60px";
        }

        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 120){
            if (scrollTop > lastScrollTop) {
                navBar.style.marginTop = '-120px';
            } else {
                navBar.style.marginTop = '0';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
