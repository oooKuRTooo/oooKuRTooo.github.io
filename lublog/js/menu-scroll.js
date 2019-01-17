var menu = document.querySelector('.header');
var lastScroll = 0;

window.onscroll = function() {
  var scrolled = document.documentElement.scrollTop;
  
  if (lastScroll > scrolled) {
  	setTimeout(function(){menu.fadeIn('fast')}, 500);
  	lastScroll = scrolled;
  } else {
  	setTimeout(function(){menu.fadeOut('fast')}, 500);
  	lastScroll = scrolled;
  }
}