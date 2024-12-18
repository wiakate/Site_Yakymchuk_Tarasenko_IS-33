const catalog_swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 120
        }
    }
});
