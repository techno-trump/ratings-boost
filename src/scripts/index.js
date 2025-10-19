import "../styles/index.scss";
import "vanilla-drawers";
import throttle from "lodash.throttle";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

import { isMobile } from "./utils.js";
import Lenis from 'lenis';

window.app = window.app || {};
window.app.hoverMedia = window.matchMedia("(any-hover: hover)");
window.app.lenis =  new Lenis({
	autoRaf: true,
})
document.documentElement.classList.toggle("is-mobile", isMobile.any());

if (window.location.hash) {
	setTimeout(() => window.app.lenis.scrollTo(window.location.hash, { offset: -60 }), 500);
}
document.querySelectorAll(`[href*="#"]:not([data-fslightbox]), [href*="/#"]:not([data-fslightbox])`).forEach(elem => {
		elem.addEventListener("click", (e) => {
			const url = new URL(elem.href);
			app.drawers.close("burger-menu");
			if (url.hostname != window.location.hostname || url.pathname != window.location.pathname || url.search != window.location.search) return;
			e.preventDefault();
			if (url.hash === "#") return;
			history.pushState(null, "", url.hash);
			window.app.lenis?.scrollTo(url.hash, { offset: -60 });
		});
	});

document.querySelectorAll(`[data-component="testimonials"]`).forEach(root => {
	const sliderEl = root.querySelector(`[data-elem="testimonials.slider"]`);
	const prevEl= root.querySelector(`[data-elem="testimonials.slider.prev"]`);
	const nextEl = root.querySelector(`[data-elem="testimonials.slider.next"]`);
	new Swiper(sliderEl, {
		modules: [Navigation],
		slidesPerView: 1.1,
		spaceBetween: 15,
		centeredSlides: false,
		grabCursor: true,
		navigation: {
			nextEl,
			prevEl
		},
		breakpoints: {
			1240: {
				slidesPerView: 2.5,
				spaceBetween: 30,
				centeredSlides: true,
			},
			1024: {
				slidesPerView: 2.2,
				spaceBetween: 30,
				centeredSlides: true,
			},
			840: {
				slidesPerView: 1.8,
				spaceBetween: 30,
				centeredSlides: true,
			},
			520: {
				slidesPerView: 1.6,
				spaceBetween: 15,
				centeredSlides: true,
			}
		}
	});
});

document.querySelectorAll(`[data-component="advantages-slider"]`).forEach(root => {
	new Swiper(root, {
		freeMode: true,
		slidesPerView: "auto",
		spaceBetween: 16,
		enabled: true,
		modules: [Autoplay],
		loop: true,
		speed: 4000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				enabled: false,
			}
		}
	});
});
document.querySelectorAll(`[data-component="packages-slider"]`).forEach(root => {
	new Swiper(root, {
		grabCursor: true,
		slidesPerView: 1,
		spaceBetween: 16,
		enabled: true,
		breakpoints: {
			1024: {
				enabled: false,
				slidesPerView: "auto",
				spaceBetween: 0,
			},
			768: {
				enabled: true,
				slidesPerView: 2.4,
				spaceBetween: 16,
			}
			,
			520: {
				enabled: true,
				slidesPerView: 1.6,
				spaceBetween: 16,
			}
		}
	});
});

setScrollSize();
const rootResizeObserver = new ResizeObserver(() => setScrollSize());
rootResizeObserver.observe(document.documentElement);
function setScrollSize() {
	setTimeout(() => {
		const scrollWidth = window.innerWidth - document.documentElement.offsetWidth;
		if (scrollWidth > 30) return setScrollSize();
		document.documentElement.style.setProperty("--scroll-width", `${window.innerWidth - document.documentElement.offsetWidth}px`);
	}, 200);
}

app.drawers.init();