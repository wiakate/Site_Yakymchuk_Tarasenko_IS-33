const catalog_swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,

    breakpoints: {
        420:{
            slidesPerView: 1.5,
            spaceBetween: 5
        },
        500:{
            slidesPerView: 2,
            spaceBetween: 10
        },
        648:{
            slidesPerView: 2.5,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 3.5,
            spaceBetween: 10
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 10
        },
        1680: {
            slidesPerView: 5.5,
            spaceBetween: 10
        }

    }
});
