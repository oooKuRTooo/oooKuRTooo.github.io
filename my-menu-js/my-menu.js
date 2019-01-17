var collapseBtn = document.querySelector('#collapse-btn');
var headMenu = document.querySelector('.head-menu');
var blur = document.querySelector('.blur-backgound');
var btnActive = false;
console.log('yes')

collapseBtn.onclick = () => {
	btnActive = !btnActive;
	if (btnActive) {
		headMenu.style.display = 'flex';
		blur.style.display = 'flex'
	} else {
		headMenu.style.display = 'none';
		blur.style.display = 'none'
	}
}

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


