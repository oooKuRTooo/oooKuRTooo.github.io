var collapseBtn = document.querySelector('#collapse-btn');
var headMenu = document.querySelector('.head-menu');/*
var blur = document.querySelector('.blur-backgound');*/
var btnActive = false;
console.log('yes')

collapseBtn.onclick = () => {
	btnActive = !btnActive;
	if (btnActive) {
		headMenu.style.display = 'flex';/*
		blur.style.display = 'flex'*/
	} else {
		headMenu.style.display = 'none';/*
		blur.style.display = 'none'*/
	}
}
/*
var bgr = document.querySelector('.bgr');

window.onscroll = function() {
  	bgr.style.height = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}*/


/* working
var bgr = document.querySelector('.bgr');

window.onscroll = function() {
  bgr.style.width = '100%';
  bgr.style.height = '100%';
}
*/


var menu = document.querySelector('.header');
var wrapper = document.querySelector('.wrapper');
var lastScroll = 0;
var delay = 0;

wrapper.onscroll = function() {
  var scrolled = wrapper.scrollTop;
  delay++;
  console.log(scrolled);
  console.log('scrolled');

  console.log(delay);

  if (lastScroll > scrolled) {
    if (delay == 35) {
      menu.style.display = 'flex';
      lastScroll = scrolled;
      delay = 0;
    }
  } else {
    if (delay == 35) {
      menu.style.display = 'none';
      headMenu.style.display = 'none';
      lastScroll = scrolled;
      btnActive = false;
      delay = 0;
    }
  }
}



