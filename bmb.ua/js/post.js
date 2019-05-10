socials = document.querySelectorAll(".social__li");

socials[0].addEventListener('click', () => {
  for (let i = 0; i < socials.length; i++) {
    if (i>0) {
      socials[i].classList.toggle('active');
    }
  }
});

function test() {
  console.log(document.querySelector(".gallery-carusel").getBoundingClientRect().top);
  console.log(document.body.clientHeight);
  
}

vh = document.body.clientHeight;
carusel = document.querySelector(".gallery-carusel");
caruselUl = document.querySelector(".gallery-carusel ul");
leftPadding = 0;

leftPadding = 0;

carusel.addEventListener('wheel', (e) => {
  $("body").mCustomScrollbar("stop");
  $("body").mCustomScrollbar("disable");
  document.body.onwheel = () => {
    $("body").mCustomScrollbar("update");
  }
  if (e.deltaY > 0 && leftPadding < caruselUl.scrollWidth) {
    leftPadding += 200;
    caruselUl.setAttribute("style", `left: calc(25% - ${leftPadding}px)`);
  } else if (e.deltaY < 0 && leftPadding > 0) {
    leftPadding -= 200;
    caruselUl.setAttribute("style", `left: calc(25% - ${leftPadding}px)`);
  }
});

content = document.querySelectorAll(".content > *");
itemsOffset = [];


for (let index = 0; index < content.length; index++) {
  itemsOffset[index] = content[index].getBoundingClientRect().top;
  console.log(itemsOffset[index]);
}

for (let index = 0; index < content.length; index++) {
  content[index].classList.add('beforeAnim');
}


(function($){
  $(window).load(function(){
      $("body").mCustomScrollbar({
        theme:"dark-thin",
        scrollInertia: 2000,
        timeout: 1000,
        mouseWheel:{ scrollAmount: 300 },
        callbacks:{
          whileScrolling:function(){
            console.log(this.mcs.top);
            for (let index = 0; index < itemsOffset.length; index++) {
              if (Math.abs(this.mcs.top) > itemsOffset[index] - vh + 200) {
                console.log('sf');
                content[index].classList.remove('beforeAnim');
                content[index].classList.add('anim');
              }
            } 
          }
        }
      });
  });
})(jQuery);


// add smartphones touch scroll event
// touchstart x coord
let startX = 0;

// if touch start, save y coord to startY
carusel.addEventListener('touchstart', function(e){

    // reference first touch point (ie: first finger)
    var touchobj = e.changedTouches[0];

    // get x position of touch point relative to left edge of browser
    startX = parseInt(touchobj.clientX);
}, false);

// if touch end, counting difference and go up or down
carusel.addEventListener('touchend', (e) => {
    // reference first touch point for this event
    var touchobj = e.changedTouches[0];
    if(touchobj.clientX - startX > 100) {
      if (leftPadding > 0) {
        leftPadding -= 200;
        caruselUl.setAttribute("style", `left: calc(25% - ${leftPadding}px)`);
      }
    } else if(touchobj.clientX - startX < -100) {

      if (leftPadding < caruselUl.scrollWidth) {
        leftPadding += 200;
        caruselUl.setAttribute("style", `left: calc(25% - ${leftPadding}px)`);
      }
    }
}, false);

caruselNewUl = document.querySelector(".caruselNew ul");
caruselNewLi = document.querySelectorAll(".caruselNew img");
fullBtns = document.querySelectorAll(".caruselNew .full-btn");
fullImage = document.querySelector(".full-image");
fullImageImg = document.querySelector(".full-image__img");
fullClose = document.querySelector(".full-image__close");

step = document.querySelector(".caruselNew li").offsetWidth;
margLeft = 0;
position = 0;
caruselNewLi[position].classList.toggle('active');
caruselNewLi[position+1].onclick = () => {
  stepGo(1);
}
fullClose.onclick = () => {
  fullImage.classList.toggle('full-image_active');
}
fullBtns[position].onclick = () => {
  fullImage.classList.toggle('full-image_active');
  fullImageImg.setAttribute('src', caruselNewLi[position].getAttribute('src'));
}


function stepGo(direction) {

  if (direction) {
    margLeft += step;
    position ++;
  }
  if (!direction) {
    margLeft -= step;
    position --;
  }



  caruselNewUl.setAttribute('style', `margin-left: ${-margLeft}px`);
  
  caruselNewLi[position].classList.toggle('active');

  caruselNewLi[position].onclick = () => {
    return false;
  }

  fullBtns[position].onclick = () => {
    fullImage.classList.toggle('full-image_active');
    fullImageImg.setAttribute('src', caruselNewLi[position].getAttribute('src'));
  }


  if (position > 0) {
    caruselNewLi[position-1].classList.remove('active');

    caruselNewLi[position-1].onclick = () => {
      stepGo(0);
    }
  }

  if (position < caruselNewLi.length - 1) {
    caruselNewLi[position+1].classList.remove('active');

    caruselNewLi[position+1].onclick = () => {
      stepGo(1);
    }
  }
}