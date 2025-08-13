import "../styles/index.scss";
import "vanilla-drawers";
import throttle from "lodash.throttle";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import { isMobile } from "./utils.js";
import Lenis from 'lenis';

window.app = window.app || {};
window.app.hoverMedia = window.matchMedia("(any-hover: hover)");
window.app.lenis =  new Lenis({
	autoRaf: true,
})
document.documentElement.classList.toggle("is-mobile", isMobile.any());

document.querySelectorAll(`[data-component="testimonials"]`).forEach(root => {
	const sliderEl = root.querySelector(`[data-elem="testimonials.slider"]`);
	const prevEl= root.querySelector(`[data-elem="testimonials.slider.prev"]`);
	const nextEl = root.querySelector(`[data-elem="testimonials.slider.next"]`);
	new Swiper(sliderEl, {
		modules: [Navigation],
		slidesPerView: 2.7,
		spaceBetween: 30,
		centeredSlides: true,
		grabCursor: true,
		navigation: {
			nextEl,
			prevEl
		}
	});
});

app.drawers.init();