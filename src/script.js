import { gsap } from "../node_modules/gsap";
import { CSSRulePlugin } from "../node_modules/gsap/CSSRulePlugin";
import { CustomEase } from "../node_modules/gsap/CustomEase";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger";
import { SplitText } from "../node_modules/gsap/SplitText";
import { ScrollSmoother } from "../node_modules/gsap/ScrollSmoother";
gsap.registerPlugin(
	ScrollTrigger,
	ScrollSmoother,
	CSSRulePlugin,
	CustomEase,
	SplitText
);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
	wrapper: ".wrapper",
	content: ".content",
	// normalizeScroll: true,
	smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
	// effects: true, // looks for data-speed and data-lag attributes on elements
});
// ***** CHECKBOX ***** //

const menuToggle = document.getElementById("toggle-nav-id");
const bodyElement = document.getElementById("body");

// freeze body content behind nav so it doesn't scroll while interacting with links //
let bodyNoScroll = () => {
	if (menuToggle.checked) {
		bodyElement.classList.add("no-scroll");
	} else {
		bodyElement.classList.remove("no-scroll");
	}
};
menuToggle.addEventListener("click", bodyNoScroll);

// ***** trying to close nav when ID links are clicked ***** //

let nodeLinks = document.querySelectorAll('.nav-item a[href*="/#"]');
let links = Array.from(nodeLinks);

links.forEach(function (item) {
	item.addEventListener("click", () => {
		menuToggle.click();
	});
});

// Cursor
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

// ***** GSAP ***** //

// Proj Gallery, horizontal scroll
let projCards = gsap.utils.toArray(".project-card");

gsap.to(".project-card", {
	xPercent: -100 * (projCards.length - 1),
	scrollTrigger: {
		anticipatePin: true,
		trigger: ".project-gallery",
		pin: true,
		ease: "none",
		pinSpacing: true,
		scrub: true,
		invalidateOnRefresh: true,
		onStart: ScrollTrigger.refresh(),
	},
});

// Logo
if (document.querySelector(".hero-home")) {
	let logotypeSelector = ".logotype a";

	gsap.to(logotypeSelector, {
		"--foreground-color": `var(--background-color)`,
		scrollTrigger: {
			// markers: true,
			trigger: ".work",
			start: "top 5%",
			// this is such a hacky way of making this stop overlapping the pin from earlier. i'm pretty sure I need to refresh the triggers so it includes  the pinspacers or something. idk man.
			end: "169.25% 10%",
			toggleActions: "play reset play reset",
			invalidateOnRefresh: true,
		},
		duration: 0.5,
	});

	// Nav Color Switch only if on desktop
	let mm = gsap.matchMedia();
	mm.add("(min-width:970px)", () => {
		let navItemSelector = ".nav-item a";

		gsap.to(navItemSelector, {
			"--foreground-color": `var(--background-color)`,
			scrollTrigger: {
				trigger: ".work",
				start: "top 10%",
				end: "169.25% 10%",
				toggleActions: "play reset play reset",
				invalidateOnRefresh: true,
			},
			duration: 0.5,
		});
	});
}

// For Home-page Hero Text

ScrollTrigger.create({
	trigger: ".hero-home",
	start: "top top",
	pin: true,
	pinSpacing: false,
});

gsap.to(".hero-text", {
	y: "16%",
	ease: "linear",
	scale: ".98",
	opacity: 0,
	scrollTrigger: {
		trigger: ".work",
		scrub: 0.5,
		start: "top 87%",
		end: "top 50%",
		toggleActions: "play pause pause reverse",
		invalidateOnRefresh: true,
	},
});

// window.addEventListener("resize", () => {
// 	ScrollTrigger.refresh();
// });
