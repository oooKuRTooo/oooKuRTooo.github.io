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

// you tube api

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            loop: 1,
            fs: 0,
            controls: 1,
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){

    // Обновляем элементы управления и загружаем
    updateTimerDisplay();
    updateProgressBar();

    // Сброс старого интервала
    clearInterval(time_update_interval);

    // Запускаем обновление таймера и дорожки проигрывания
    // каждую секунду.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
}

//

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
    player.unMute();
    player.seekTo(0);
}

var isPlay = false;

window.onscroll = () => {
    console.log('22');
    if ((pageYOffset > innerHeight - 100) && !isPlay) {
        document.querySelector('#video-bgr').style.opacity = '0.1';
        player.mute();
        player.seekTo(0);
        isPlay = !isPlay;
    }
}
