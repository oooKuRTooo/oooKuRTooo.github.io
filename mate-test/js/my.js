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

/*==================================================
    you tube api - для роботи з плейером you tube
==================================================*/
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        videoId: 'gCcx85zbxz4',
        playerVars: {
            loop: 1, // loop playlist / зациклюєм плейлист
            fs: 0, // off play btn / забираєм стандартну кнопку плей
            controls: 1, // show interface / показуєм елементи управління
            color: 'white', // color interface / колір інтерфейсу
            playlist: 'taJ60kskkns,FG0fTKAqZ5g' // плейлист 
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){
    // update inteface
    updateTimerDisplay();
    updateProgressBar();
    // reset time - interval
    clearInterval(time_update_interval);
    // start timer update every sec
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
}

/*=======================================================
    animation of first section - анімація першої секції
=========================================================*/
document.addEventListener('mousemove', function(event) {
    if(window.matchMedia('(min-width: 992px)').matches) {
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
    }  
});
/*=======================================================
    for scroll btn - скролл до другої секції
=========================================================*/
scrollBtn.onclick = () => {
    document.querySelector('#scroll-anchor').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
/*=======================================================
    video bgr fade and video play - 
    ховаєм бекграунд відео та запускаєм відео
=========================================================*/

playBtn.onclick = () => {
    videoBgr.style.display = 'none';
    playBtn.style.display = 'none';
    player.unMute(); // volume on
    player.seekTo(0); // time play
}

var isPlay = false;

window.onscroll = () => {
    console.log('22');
    if ((pageYOffset > innerHeight - 100) && !isPlay) {
        document.querySelector('#video-bgr').style.opacity = '0.1';
        player.mute(); // volume off
        player.seekTo(0);
        isPlay = !isPlay;
    }
}

/*=======================================================
    put current date in #date - 
    показуєм дату та час
=========================================================*/
var monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

setInterval(() => {
    var date = new Date();
    var dayPref;
    if (date.getDate() === 1) dayPref = 'st, ';
    else if (date.getDate() === 2) dayPref = 'nd, ';
    else if (date.getDate() === 3) dayPref = 'rd, ';
    else dayPref = 'th, ';

    function isLessTen (num) { // no comments
        return num < 10 ? '0' + num : String(num);
    }

    document.querySelector('#date').innerHTML = daysList[date.getDay()] + ', ' + monthsList[date.getMonth()] + ', ' + date.getDate() + dayPref + isLessTen(date.getHours()) + ':' + isLessTen(date.getMinutes()) + ':' + isLessTen(date.getSeconds()) + ' GTM' + (-date.getTimezoneOffset()/60);
}, 1000);

