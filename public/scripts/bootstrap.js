function init()
{
	window.navScrollInfo = {
		lastScroll: 0,
		header : document.getElementsByTagName("header")[0],
		footer : document.getElementsByTagName("footer")[0],
		nav : document.getElementsByTagName("nav")[0],
		main : document.getElementById("bs-main")
	};
};

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function updateNavPosition()
{
	if (window.navScrollInfo == null) init();
	if (!hasClass(navScrollInfo.main, "bs-leftnav")) return;
	var nav = window.navScrollInfo.nav;
	var symin = -document.body.getBoundingClientRect().top;
	var symax = symin + window.innerHeight;
	var miny = navScrollInfo.header.offsetHeight;
	var maxy = navScrollInfo.footer.offsetTop;
	var y = nav.style.position == "fixed" ? symin + nav.offsetTop : nav.offsetTop + miny;
	var h = nav.offsetHeight;

	//console.log(y + " " + h + " " + symin + " "+ symax);

	if (symin <= miny || h >= navScrollInfo.main.offsetHeight) { // don't overlap header
		nav.style.top = 0;
		nav.style.bottom = "";
		nav.style.position = "relative";
	} else if (symax >= maxy && h > maxy - symin) { // don't overlap footer
		nav.style.top = (maxy - miny - h) + "px";
		nav.style.bottom = "";
		nav.style.position = "relative";
	} else if (h <= symax - symin) { // navigation fits into view -> stick to the top
		nav.style.top = 0;
		nav.style.bottom = "";
		nav.style.position = "fixed";
	} else if (y < symin && y + h < symax) { // starts scrolling out to the top -> stick to the bottom
		nav.style.top = "";
		nav.style.bottom = 0;
		nav.style.position = "fixed";
	} else if (y + h > symax && y > symin) { // starts scrolling out to the bottom -> stick to the top
		nav.style.top = 0;
		nav.style.bottom = "";
		nav.style.position = "fixed";
	} else if (nav.style.position == "fixed") { // scroll direction reversed? put pack to relative positioning mode
		if ((navScrollInfo.lastScroll > symin && nav.style.top === "") || (navScrollInfo.lastScroll < symin && nav.style.bottom === "")) {
			nav.style.position = "relative";
			nav.style.top = (y - miny) + "px";
			nav.style.bottom = "";
		}
	}

	navScrollInfo.lastScroll = symin;
}

window.onscroll = updateNavPosition;
window.onresize = updateNavPosition;
