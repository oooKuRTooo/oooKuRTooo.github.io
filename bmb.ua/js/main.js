socials = document.querySelectorAll(".social__li");

socials[0].addEventListener('click', () => {
  for (let i = 0; i < socials.length; i++) {
    if (i>0) {
      socials[i].classList.toggle('active');
    }
  }
});

tag = document.querySelector(".main__tag");
title = document.querySelector(".main__title");
time = document.querySelector(".main__time");
desc = document.querySelector(".main__description");
mainBackgroundBack = document.querySelector(".main__background-back");
mainBackgroundFont = document.querySelector(".main__background-font");
background = document.querySelector(".wrapper__background");
videoBgr = document.querySelector('.video-bgr');


function changePost(bgr, bgrBack, bgrFont, tagText, titleText, timeText, descText) {
  mainBackgroundBack.setAttribute("style", `background-image: url(img/${bgrBack})`);
  mainBackgroundFont.setAttribute("style", `background-image: url(img/${bgrFont})`);
  background.setAttribute("style", `background-image: url(img/${bgr})`);
  tag.style.opacity = 0;
  title.style.opacity = 0;
  time.style.opacity = 0;
  desc.style.opacity = 0;
  tag.innerHTML = tagText;
  title.innerHTML = titleText;
  time.innerHTML = timeText;
  desc.innerHTML = descText;
  setInterval(() => {
    tag.style.opacity = 1;
    title.style.opacity = 1;
    time.style.opacity = 1;
    desc.style.opacity = 1;
  }, 500);
}

navNums = document.querySelectorAll(".nav-panel__li");
activePage = navNums[1];

navNums[2].addEventListener('click', () => {
  changePost('11.jpg', '12.jpg', '11.jpg', 'video', 'Більш Менш Шоу', '8 хв', 'Канарские острова, испанский архипелаг недалеко от северо-западного побережья Африки, – холмистые вулканические острова, известные своими пляжами.');
  videoBgr.pause();
  videoBgr.style.opacity = 0;
});

navNums[3].addEventListener('click', () => {
  changePost('4.1.jpg', '4.2.jpg', '4.1.jpg', 'travel', 'Більш Менш Шоу', '8 хв', 'Канарские острова, испанский архипелаг недалеко от северо-западного побережья Африки, – холмистые вулканические острова, известные своими пляжами.');
  videoBgr.pause();
  videoBgr.style.opacity = 0;
});

navNums[4].addEventListener('click', () => {
  changePost('5.1.jpg', '5.2.jpg', '5.1.jpg', 'video', 'Більш Менш Шоу', '8 хв', 'Канарские острова, испанский архипелаг недалеко от северо-западного побережья Африки, – холмистые вулканические острова, известные своими пляжами.');
  videoBgr.currentTime = 0;
  videoBgr.play();
  videoBgr.style.opacity = 1;
});


navNums.forEach(element => {
  element.addEventListener('click', () => {
    activePage.classList.remove("active");
    activePage = element;
    activePage.classList.add("active");
  });
});

particlesJS('particles-js',
  
{
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": false,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": false
  }

);