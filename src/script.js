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

// ***** GSAP ***** //

//enter
gsap.to(".logotype", {
	ease: "power4.out",
	color: "var(--main-dark)",
	borderColor: "var(--main-dark)",
	duration: 2,
	scrollTrigger: {
		trigger: ".work",
		scrub: true,
		toggleActions: "play reverse play reverse",
		start: "top 10%",
	},
});

gsap.to(".nav-item a", {
	ease: "power4.out",
	color: "var(--main-dark)",
	borderColor: "var(--main-dark)",
	duration: 2,
	scrollTrigger: {
		trigger: ".work",
		scrub: true,
		toggleActions: "play reset play reset",
		start: "top 10%",
		end: "bottom 10%",
	},
});

gsap.to(".nav-wrapper:before", {
	ease: "power4.out",
	backgroundColor: "var(--background-color)",
	duration: 2,
	scrollTrigger: {
		trigger: ".work",
		scrub: true,
		markers: "true",
		toggleActions: "play reset play reset",
		start: "top 10%",
		end: "bottom 10%",
	},
});

//leave
gsap.to(".logotype", {
	ease: "power4.out",
	color: "var(--foreground-color)",
	borderColor: "var(--foreground-color)",
	duration: 2,
	scrollTrigger: {
		trigger: ".work",
		scrub: true,
		toggleActions: "play reverse play reverse",
		start: "bottom 10%",
	},
});

gsap.to(".nav-item a", {
	ease: "power4.out",
	color: "var(--foreground-color)",
	borderColor: "var(--foreground-color)",
	duration: 2,
	scrollTrigger: {
		trigger: ".work",
		scrub: true,
		toggleActions: "play reset play reset",
		start: "bottom 10%",
		end: "top 10%",
	},
});
