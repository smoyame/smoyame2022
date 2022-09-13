// Checkbox

const menuToggle = document.getElementById("toggle-nav-id");
const bodyElement = document.getElementById("body");

// ***** freeze body content behind nav so it doesn't scroll while interacting with links ***** //
let bodyNoScroll = () => {
	if (menuToggle.checked) {
		bodyElement.classList.add("no-scroll");
	} else {
		bodyElement.classList.remove("no-scroll");
	}
};
menuToggle.addEventListener("click", bodyNoScroll);

// ***** trying to close nav when ID links are clicked ***** //

let nodeLinks = document.querySelectorAll('a[href*="/#"]');

let links = Array.from(nodeLinks);

links.forEach(function (item) {
	item.addEventListener("click", () => {
		menuToggle.click();
	});
});
