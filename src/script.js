// import { gsap } from "../node_modules/gsap";
// import { CSSRulePlugin } from "../node_modules/gsap/CSSRulePlugin";
// import { CustomEase } from "../node_modules/gsap/CustomEase";
// import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger";

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

// gsap.from("#cursor", { ease: "linear", autoAlpha: 0 });

// Proj Gallery, horizontal scroll
let projCards = gsap.utils.toArray(".project-card");
gsap.to(".project-gallery", {
	xPercent: -100 * (projCards.length - 1),
	scrollTrigger: {
		trigger: ".project-gallery",
		start: "top top",
		pin: true,
		// anticipatePin: 1,
		scrub: 1,
		// base vertical scrolling on how wide the container is so it feels more natural.
		end: "+=1200",
	},
});

// Logo
let logotypeSelector = ".logotype a";
gsap.to(logotypeSelector, {
	"--foreground-color": "var(--main-dark)",
	scrollTrigger: {
		trigger: ".work",
		start: "top 5%",
		toggleActions: "play reset play reset",
	},
});

gsap.to(logotypeSelector, {
	"--foreground-color": "var(--main-bright)",
	scrollTrigger: {
		trigger: ".work",
		start: "bottom 3%",
		toggleActions: "play reset play reset",
	},
});

// Nav Color Switch only if on desktop
let mm = gsap.matchMedia();
mm.add("(min-width:970px)", () => {
	let navItemSelector = ".nav-item a";
	gsap.to(navItemSelector, {
		"--foreground-color": "var(--main-dark)",
		borderColor: "var(--foreground-color)",
		scrollTrigger: {
			trigger: ".work",
			start: "top 10%",
			end: "bottom 10%",
			toggleActions: "play reset play reset",
		},
	});
	gsap.to(navItemSelector, {
		"--foreground-color": "var(--main-bright)",
		borderColor: "var(--foreground-color)",
		scrollTrigger: {
			trigger: ".work",
			start: "bottom 10%",
			toggleActions: "play reset play reset",
		},
	});
});

// For Home-page Hero Text

gsap.to(".hero-text", {
	y: "16%",
	scale: ".98",
	opacity: 0,
	scrollTrigger: {
		trigger: ".work",
		scrub: 0.5,
		// markers: true,
		start: "top 87%",
		end: "top 50%",
		toggleActions: "play pause pause reverse",
	},
});
