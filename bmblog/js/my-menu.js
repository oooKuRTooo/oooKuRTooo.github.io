var collapseBtn = document.querySelector('#collapse-btn');
var headMenu = document.querySelector('.head-menu');
/*var blur = document.querySelector('.blur-backgound');*/
var menu = document.querySelector('.header');
var wrapper = document.querySelector('.wrapper');
var siteName = document.querySelector('.site-name');
var btnActive = false;
var lastScroll = 80;
var delay = 0;

var btnSpan1 = document.querySelector('#bar-one');
var btnSpan2 = document.querySelector('#bar-two');
var btnSpan3= document.querySelector('#bar-three');


/*=========== main func ============*/

if(window.matchMedia('(max-width: 991.98px)').matches) {

  /*======= menu tunggle =============*/

  collapseBtn.onclick = () => {
    btnActive = !btnActive;
    btnSpan1.style.animation = null;
    btnSpan2.style.animation = null;
    btnSpan3.style.animation = null;
    headMenu.style.animation = null;
    btnSpan1.offsetHeight; /* trigger reflow */

    if (btnActive) {

      headMenu.style.display = 'flex';

      /* animate */
      btnSpan1.style.animation = 'lineOne  1s';
      btnSpan1.style.animationFillMode = "forwards";
      btnSpan2.style.animation = 'lineTwo  1s';
      btnSpan2.style.animationFillMode = "forwards";
      btnSpan3.style.animation = 'lineThree  1s';
      btnSpan3.style.animationFillMode = "forwards";

      headMenu.style.animation = 'menuOn  1.5s';

      
      /*blur.style.display = 'flex'*/
    } else {
      headMenu.style.animation = 'menuOn  1.5s reverse';
      setTimeout(() => {
        headMenu.style.display = 'none';
      }, 1200);
      /*
      */

      /* animate */
      btnSpan1.style.animation = 'lineOne  1s reverse';
      btnSpan1.style.animationFillMode = "forwards";
      btnSpan2.style.animation = 'lineTwo  1s reverse';
      btnSpan2.style.animationFillMode = "forwards";
      btnSpan3.style.animation = 'lineThree  1s reverse';
      btnSpan3.style.animationFillMode = "forwards";

      headMenu.style.animation = 'menuOn  1.5s reverse';
      /*
      collapseBtn.classList.remove('collapse-btn-on');
      collapseBtn.classList.add('collapse-btn-off');*/
      /*blur.style.display = 'none'*/
    }
  }


  /*========== menu scroll fade ============*/

  wrapper.onscroll = function() {
    var scrolled = wrapper.scrollTop;
    delay++;
    
    

    if (lastScroll > scrolled) {
      if (delay == 20) {

        /*==== null btn animate ======*/
        btnSpan1.style.animation = null;
        btnSpan2.style.animation = null;
        btnSpan3.style.animation = null;
        menu.style.animation = 'menuFade  0.5s';
        collapseBtn.style.animation = 'menuFade  1s';
        siteName.style.animation = 'menuFade  1s';
        menu.style.display = 'flex';
        lastScroll = scrolled;
        delay = 0;
      }
    } else {
      if (delay == 20) {
        menu.style.display = 'none';
        headMenu.style.display = 'none';
        lastScroll = scrolled;
        btnActive = false;
        delay = 0;
      }
    }

    if (scrolled < 80) {
      menu.style.display = 'flex';
      lastScroll = 80;
    }
  }

} else {

}
