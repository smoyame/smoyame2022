import { gsap } from "../node_modules/gsap";
import { CSSRulePlugin } from "../node_modules/gsap/CSSRulePlugin";
import { CustomEase } from "../node_modules/gsap/CustomEase";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger";
import { SplitText } from "../node_modules/gsap/SplitText";
import { ScrollSmoother } from "../node_modules/gsap/ScrollSmoother";
import { ScrollToPlugin } from "../node_modules/gsap/ScrollToPlugin";
gsap.registerPlugin(
	ScrollTrigger,
	ScrollSmoother,
	CSSRulePlugin,
	CustomEase,
	SplitText,
	ScrollToPlugin
);

gsap.from(".container", { ease: "linear", autoAlpha: 0 });
// gsap.from("#cursor", { ease: "linear", autoAlpha: 0 });

// create the scrollSmoother before your scrollTriggers
// let smoother = ScrollSmoother.create({
// 	wrapper: ".wrapper",
// 	content: ".content",
// 	// onStop: ScrollTrigger.refresh(),
// 	normalizeScroll: true,
// 	smooth: 1,
// 	smoothTouch: false,
// 	ignoreMobileResize: true, // how long (in seconds) it takes to "catch up" to the native scroll position
// 	// effects: true, // looks for data-speed and data-lag attributes on elements
// });
// ***** CHECKBOX ***** //

const menuToggle = document.getElementById("toggle-nav-id");
const bodyElement = document.getElementById("body");
CustomEase.create(
	"growSoft",
	"M0,0 C0,0.604 0.161,0.752 0.214,0.804 0.265,0.855 0.396,1 1,1 "
);

// freeze body content behind nav so it doesn't scroll while interacting with links //
let bodyNoScroll = () => {
	if (menuToggle.checked) {
		bodyElement.classList.add("no-scroll");
	} else {
		bodyElement.classList.remove("no-scroll");
	}
};
menuToggle.addEventListener("click", bodyNoScroll);

// ***** close nav when same-page ID links are clicked ***** //
let windowQuery = window.matchMedia("(min-width: 980px)");
let closeMenu = () => {
	if (windowQuery) {
		let nodeLinks = document.querySelectorAll('.nav-item a[href*="/#"]');
		let links = Array.from(nodeLinks);

		links.forEach(function (item) {
			item.addEventListener("click", () => {
				menuToggle.click();
			});
		});
	}
};
closeMenu();

// *************** Cursor *************** //

if (windowQuery) {
	gsap.from("#cursor", { ease: "linear", autoAlpha: 0, delay: 0.5 });
	// ▶ cojea gabriel - thanks a bunch dude - cursor ◀
	const cursor = document.querySelector("#cursor");
	const cursorCircle = cursor.querySelector(".cursor__circle");

	const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
	const pos = { x: 0, y: 0 }; // cursor's coordinates
	const speed = 0.4; // between 0 and 1

	const updateCoordinates = (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

	window.addEventListener("mousemove", updateCoordinates);

	function getAngle(diffX, diffY) {
		return (Math.atan2(diffY, diffX) * 180) / Math.PI;
	}

	function getSqueeze(diffX, diffY) {
		const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
		const maxSqueeze = 0.45;
		const accelerator = 1500;
		return Math.min(distance / accelerator, maxSqueeze);
	}

	const updateCursor = () => {
		const diffX = Math.round(mouse.x - pos.x);
		const diffY = Math.round(mouse.y - pos.y);

		pos.x += diffX * speed;
		pos.y += diffY * speed;

		const angle = getAngle(diffX, diffY);
		const squeeze = getSqueeze(diffX, diffY);

		const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
		const rotate = "rotate(" + angle + "deg)";
		const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

		cursor.style.transform = translate;
		cursorCircle.style.transform = rotate + scale;
	};

	function loop() {
		updateCursor();
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);

	const cursorModifiers = document.querySelectorAll("[data-cursor-class]");
	cursorModifiers.forEach((cursorModifier) => {
		cursorModifier.addEventListener("mouseenter", function () {
			const className = this.getAttribute("data-cursor-class");
			cursor.classList.add(className);
		});

		cursorModifier.addEventListener("mouseleave", function () {
			const className = this.getAttribute("data-cursor-class");
			cursor.classList.remove(className);
		});
	});
}

// *************** Nav *************** //
// set up for mobile first here
let scrollPos = 0;
let seeSetScrollPos = () => {
	// detects new state and compares it with the new one
	if (
		document.body.getBoundingClientRect().top > scrollPos ||
		scrollPos > -400
	) {
		document.getElementById("logotype").classList.remove("logotype-leave");
	} else {
		document.getElementById("logotype").classList.add("logotype-leave");
	}
	// saves the new position after animation/effect for next iteration.
	scrollPos = document.body.getBoundingClientRect().top;
	// console.log(scrollPos);
};
window.addEventListener("scroll", seeSetScrollPos);

// *************** SVGs *************** //

// let assignAllLengths = () => {
// 	let lines = document.querySelectorAll(".sketchbook-line");
// 	let singleVw = 100 / window.innerWidth;
// 	const assignLength = (instance) => {
// 		let length = instance.getTotalLength();
// 		instance.style.cssText += `--array: ${length + length * 10 * singleVw}`;
// 	};

// 	lines.forEach(assignLength);
// };

// window.resize = assignAllLengths();
// *************** GSAP *************** //

// utilities
// let yDifference = "-10vh";
let fadeUpIn = (elementSelector, yDifference) => {
	let elementQuery = document.querySelector(elementSelector);
	if (elementQuery !== null) {
		gsap.from(elementSelector, {
			duration: 1,
			delay: 0,
			opacity: 0,
			ease: "growSoft",
			y: yDifference,
		});
	}
};

fadeUpIn(".hero-text", "30vh");
fadeUpIn(".job-title", "1rem");

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */

{
	// body element
	const body = document.body;

	// helper functions
	const MathUtils = {
		// linear interpolation
		lerp: (a, b, n) => (1 - n) * a + n * b,
		// distance between two points
		distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
	};

	// get the mouse position
	const getMousePos = (ev) => {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) {
			posx = ev.pageX;
			posy = ev.pageY;
		} else if (ev.clientX || ev.clientY) {
			posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
			posy = ev.clientY + body.scrollTop + docEl.scrollTop;
		}
		hoverBanner = ev.target == banner;
		return { x: posx, y: posy };
	};

	// mousePos: current mouse position
	// cacheMousePos: previous mouse position
	// lastMousePos: last last recorded mouse position (at the time the last image was shown)
	let mousePos = { x: 0, y: 0 };
	let lastMousePos = { x: 0, y: 0 };
	let cacheMousePos = { x: 0, y: 0 };
	let hoverBanner = false;

	// Listen for sketch banner ONLY
	let banner = document.querySelector(".sketchbook-banner");

	// update the mouse position
	window.addEventListener("mousemove", (ev) => (mousePos = getMousePos(ev)));

	// gets the distance from the current mouse position to the last recorded mouse position
	const getMouseDistance = () =>
		MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

	class Image {
		constructor(el) {
			this.DOM = { el: el };
			// image deafult styles
			this.defaultStyle = {
				scale: 1,
				x: 0,
				y: 0,
				opacity: 0,
			};
			// get sizes/position
			this.getRect();
			// init/bind events
			this.initEvents();
		}
		initEvents() {
			// on resize get updated sizes/position
			window.addEventListener("resize", () => this.resize());
		}
		resize() {
			// reset styles
			gsap.set(this.DOM.el, this.defaultStyle);
			// get sizes/position
			this.getRect();
		}
		getRect() {
			this.rect = this.DOM.el.getBoundingClientRect();
		}
		isActive() {
			// check if image is animating or if it's visible
			return gsap.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
		}
	}

	class ImageTrail {
		constructor() {
			// images container
			this.DOM = { content: document.querySelector(".main") };
			// array of Image objs, one per image element
			this.images = [];
			[...this.DOM.content.querySelectorAll(".sketch-preview")].forEach((img) =>
				this.images.push(new Image(img))
			);
			// total number of images
			this.imagesTotal = this.images.length;
			// upcoming image index
			this.imgPosition = 0;
			// zIndex value to apply to the upcoming image
			this.zIndexVal = 1;
			// mouse distance required to show the next image
			this.threshold = 100;
			// render the images
			requestAnimationFrame(() => this.render());
		}
		render() {
			// get distance between the current mouse position and the position of the previous image
			let distance = getMouseDistance();
			// cache previous mouse position
			cacheMousePos.x = MathUtils.lerp(
				cacheMousePos.x || mousePos.x,
				mousePos.x,
				0.1
			);
			cacheMousePos.y = MathUtils.lerp(
				cacheMousePos.y || mousePos.y,
				mousePos.y,
				0.1
			);

			// if the mouse moved more than [this.threshold] then show the next image
			if (distance > this.threshold) {
				this.showNextImage();

				++this.zIndexVal;
				this.imgPosition =
					this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

				lastMousePos = mousePos;
			}

			// check when mousemove stops and all images are inactive (not visible and not animating)
			let isIdle = true;
			for (let img of this.images) {
				if (img.isActive()) {
					isIdle = false;
					break;
				}
			}
			// reset z-index initial value
			if (isIdle && this.zIndexVal !== 1) {
				this.zIndexVal = 1;
			}

			// loop..
			requestAnimationFrame(() => this.render());
		}
		showNextImage() {
			// show image at position [this.imgPosition]
			const img = this.images[this.imgPosition];
			// kill any tween on the image
			let timeline = gsap.timeline();

			//for now
			let mqMatch = window.matchMedia("(min-width:980px)");
			if (mqMatch.matches) {
				if (hoverBanner) {
					gsap.killTweensOf(img.DOM.el);
					timeline = timeline
						// show the image
						.set(
							img.DOM.el,
							{
								startAt: { opacity: 1, scale: 0.6 },
								opacity: 1,
								scale: 0.6,
								zIndex: this.zIndexVal,
								x: cacheMousePos.x - img.rect.width / 2,
								y: cacheMousePos.y - img.rect.height / 2,
							},
							0
						)
						// animate position
						.to(
							img.DOM.el,
							0.9,
							{
								ease: "expo.out",
								x: mousePos.x - img.rect.width / 2,
								y: mousePos.y - img.rect.height / 2,
							},
							0
						);
				}
				// then make it disappear
				timeline
					.to(
						img.DOM.el,
						0.9,
						{
							ease: "power1.out",
							opacity: 0,
						},
						0.3
					)
					// scale down the image
					.to(
						img.DOM.el,
						1,
						{
							ease: "power4.in",
							scale: 0.5,
						},
						0.4
					);
			}
		}
	}

	/***********************************/
	/********** Preload stuff **********/

	// Preload images
	const preloadImages = () => {
		return new Promise((resolve, reject) => {
			imagesLoaded(document.querySelectorAll(".sketch-preview"), resolve);
		});
	};

	// And then..
	preloadImages().then(() => {
		// Remove the loader
		document.body.classList.remove("loading");
		new ImageTrail();
	});
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//background icon passive move up

// gsap.to(".background-icon", {
// 	yPercent: "-38.5",
// 	scrollTrigger: {
// 		trigger: ".hero-home",
// 		start: "top -5%",
// 		// markers: true,
// 		endTrigger: ".project-gallery",
// 		end: "top 25%",
// 		scrub: true,
// 	},
// });

// Proj Gallery, horizontal scroll

// let projCardAmnt = document.querySelectorAll(".project-card");

// let sections = gsap.utils.toArray(".project-card");
// let gallDist = -100 * (projCardAmnt.length - 1);
// gsap.to(".project-gallery", {
// 	// xPercent: `${gallDist}`,
// 	xPercent: -1 * (100 - 100 / projCardAmnt.length),
// 	scrollTrigger: {
// 		// anticipatePin: 1,
// 		trigger: ".project-gallery",
// 		start: "top top",
// 		end: "+=1500",
// 		pin: true,
// 		ease: "none",
// 		scrub: 0.3,
// 		invalidateOnRefresh: true,
// 	},
// });

// *** compensating for the clicks scrollSmoother prevents since it's transformed , with an animation on click *** //
// let currentURL = window.location.pathname;
// let smoothAnchorLink = (selector) => {
// 	gsap.to(smoother, {
// 		scrollTop: smoother.offset(selector, "top top"),
// 		duration: 1,
// 		ease: "power3.out",
// 	});
// };
// let whenFromSubd = (anchorLink, selector) => {
// 	if (window.location.href.indexOf(anchorLink) > -1) {
// 		smoothAnchorLink(selector);
// 	}
// };
// const findsLink = document.querySelector("[href='/#finds']");
// const workLink = document.querySelector("[href='/#work']");

// let workNav = () => {
// 	workLink.addEventListener("click", (e) => {
// 		if (currentURL == "/") {
// 			e.preventDefault();
// 		}
// 		smoothAnchorLink(".work");
// 	});
// };

// let findNav = () => {
// 	findsLink.addEventListener("click", (e) => {
// 		if (currentURL == "/") {
// 			e.preventDefault();
// 		}
// 		smoothAnchorLink(".finds");
// 	});
// };

// whenFromSubd("/#work", ".work");
// whenFromSubd("/#finds", ".finds");
// workNav();
// findNav();

// // Logo
// if (document.querySelector(".hero-home")) {
// 	let logotypeSelector = ".logotype a";

// 	gsap.to(logotypeSelector, {
// 		"--foreground-color": `var(--background-color)`,
// 		scrollTrigger: {
// 			// markers: true,
// 			trigger: ".work",
// 			start: "top 5%",
// 			// this is such a hacky way of making this stop overlapping the pin from earlier. i'm pretty sure I need to refresh the triggers so it includes  the pinspacers or something. idk man.
// 			end: "169.25% 10%",
// 			// end: "bottom 5%",
// 			toggleActions: "play reset play reset",
// 			invalidateOnRefresh: true,
// 		},
// 		duration: 0.5,
// 	});

// 	// Nav Color Switch only if on desktop
// 	let mm = gsap.matchMedia();
// 	mm.add("(min-width:980px)", () => {
// 		let navItemSelector = ".nav-item a";

// 		gsap.to(navItemSelector, {
// 			"--foreground-color": `var(--background-color)`,
// 			scrollTrigger: {
// 				trigger: ".work",
// 				start: "top 10%",
// 				end: "169.25% 10%",
// 				// end: "bottom 9%",
// 				toggleActions: "play reset play reset",
// 				invalidateOnRefresh: true,
// 			},
// 			duration: 0.5,
// 		});
// 	});
// }

// For Home-page Hero Text

// ScrollTrigger.create({
// 	trigger: ".hero-home",
// 	start: "top top",
// 	pin: true,
// 	pinSpacing: false,
// });

// gsap.to(".hero-text", {
// 	y: "16%",
// 	ease: "linear",
// 	scale: ".98",
// 	opacity: 0,
// 	scrollTrigger: {
// 		trigger: ".work",
// 		scrub: 0.5,
// 		start: "top 87%",
// 		end: "top 50%",
// 		toggleActions: "play pause pause reverse",
// 		invalidateOnRefresh: true,
// 	},
// });

// window.addEventListener("resize", () => {
// 	ScrollTrigger.refresh();
// });
