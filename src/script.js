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

// ***** Cursor ***** //

if (windowQuery) {
	gsap.from("#cursor", { ease: "linear", autoAlpha: 0 });
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

// * Nav disappear on scroll * //
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
	console.log(scrollPos);
};
window.addEventListener("scroll", seeSetScrollPos);

// ***** GSAP ***** //

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
