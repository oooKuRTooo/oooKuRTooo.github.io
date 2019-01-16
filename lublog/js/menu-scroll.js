var menu = document.querySelector('.header');
var lastScroll = 0;

window.onscroll = function() {
  var scrolled = document.documentElement.scrollTop;
  
  if (lastScroll > scrolled) {
  	menu.style.position = 'fixed';
  	lastScroll = scrolled;
  } else {
  	menu.style.position = 'static';
  	lastScroll = scrolled;
  }
}