var parallaxOne = document.querySelector('#parallax img:nth-child(1)');
var parallaxTwo = document.querySelector('#parallax img:nth-child(2)');
var parallaxThree = document.querySelector('#parallax img:nth-child(3)');
var parallaxFour = document.querySelector('#parallax img:nth-child(4)');
var secOne = document.querySelector('#sec-section h2');
var secTwo = document.querySelector('#first-section h2');
var scrollBtn = document.querySelector('#scroll-btn');
var videoBgr = document.querySelector('#video-bgr');
var playBtn = document.querySelector('#play-btn');
var video = document.querySelector('#video');

document.addEventListener('mousemove', function(event) {
    if (event.clientX > screen.width / 2) {
        parallaxOne.style.transform = "translateX(25px)";
        parallaxTwo.style.transform = "translateX(25px)";
        parallaxThree.style.transform = "translateX(-10px)";
        parallaxFour.style.transform = "translateX(25px)";
    } else {
        parallaxOne.style.transform = 'translateX(-25px)';
        parallaxTwo.style.transform = "translateX(-25px)";
        parallaxThree.style.transform = "translateX(10px)";
        parallaxFour.style.transform = "translateX(-25px)";
    }
});

scrollBtn.onclick = () => {
    document.querySelector('#scroll-anchor').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

playBtn.onclick = () => {
    videoBgr.style.display = 'none';
    playBtn.style.display = 'none';
}

video.onmousemove = () => {
    document.querySelector('#video-bgr').classList.add('video-hover');
}