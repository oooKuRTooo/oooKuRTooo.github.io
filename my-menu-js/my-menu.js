var collapseBtn = document.querySelector('#collapse-btn');
var headMenu = document.querySelector('.head-menu');
/*var blur = document.querySelector('.blur-backgound');*/
var menu = document.querySelector('.header');
var wrapper = document.querySelector('.wrapper');
var btnActive = false;
var lastScroll = 0;
var delay = 0;


/*=========== main func ============*/

if(window.matchMedia('(max-width: 991.98px)').matches) {

  /*======= menu tunggle =============*/

  collapseBtn.onclick = () => {
    btnActive = !btnActive;
    if (btnActive) {
      headMenu.style.display = 'flex';
      /*blur.style.display = 'flex'*/
    } else {
      headMenu.style.display = 'none';
      /*blur.style.display = 'none'*/
    }
  }


  /*========== menu scroll fade ============*/

  wrapper.onscroll = function() {
    var scrolled = wrapper.scrollTop;
    delay++;

    if (lastScroll > scrolled) {
      if (delay == 20) {
        menu.style.position = 'fixed';
        lastScroll = scrolled;
        delay = 0;
      }
    } else {
      if (delay == 20) {
        menu.style.position = 'relative';
        headMenu.style.display = 'none';
        lastScroll = scrolled;
        btnActive = false;
        delay = 0;
      }
    }
  }
} else {

}
