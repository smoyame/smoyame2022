// Checkbox

const menuToggle = document.getElementById("toggle-nav-id");
const bodyElement = document.getElementById("body");

let bodyNoScroll = () => {
	if (menuToggle.checked) {
		bodyElement.classList.add("no-scroll");
	} else {
		bodyElement.classList.remove("no-scroll");
	}
};

menuToggle.addEventListener("click", bodyNoScroll);
