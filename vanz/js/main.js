var dots = document.querySelectorAll('.left-nav .dot');
var lines = document.querySelectorAll('.left-nav .line');
var nums = document.querySelectorAll('.left-nav h2');
var anchors = document.querySelectorAll('.anchor');
var dotsColors = ['white', 'black', 'white', 'white', 'black', 'black'];
var isTime = true;
var sections = document.querySelectorAll('section');
var secCoordY = [];

var wrapper = document.querySelector('.wrapper');

for (let i = 0; i < sections.length; i++) {
    secCoordY.push(sections[i].getBoundingClientRect().y);
}

lines[0].style.height = '40px';
nums[0].style.height = 'auto';


function Dot(dot, line, num) {
    this.isActive = false;
    this.color = 'white';

    this.dot = dot;
    this.line = line;
    this.num = num;

    this.changeColor = (color) => {
        this.color = color;
        this.dot.style.backgroundColor = this.color;
        this.line.style.backgroundColor = this.color;
        this.num.style.color = this.color;
    }

    this.activeToggle = (toggle) => {
        this.isActive = toggle;
        if (!this.isActive) {
            this.line.style.height = '0';
            this.dot.style.opacity = '0.5';
            this.num.style.height = '0';
        } else {
            this.line.style.height = '40px';
            this.dot.style.opacity = '1';
            this.num.style.height = 'auto';
        }
    }
}

function Models(array) {
    this.activeChange = (index) => {
        for (let i = 0; i < array.length; i++) {
            if (i == index) {
                array[i].activeToggle(true);
            } else {
                array[i].activeToggle(false);
            }
        }
    }
    this.colorChange = (index) => {
        for (let i = 0; i < array.length; i++) {
            array[i].changeColor(dotsColors[index]);
        }
    }
    this.getActiveDot = () => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].isActive) return i;
        }
    }
}

function goToAnchor(index) {
    anchors[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    dotsUtil.activeChange(index);
    dotsUtil.colorChange(index);
}

function stop() {
    isTime = false;
    setTimeout(() => {
        isTime = true;
    }, 1000);
}

var dotsModels = [];
var dotsUtil = new Models(dotsModels);


for (let i = 0; i < dots.length; i++) {
    dotsModels.push(new Dot(dots[i], lines[i], nums[i]));
    dotsModels[i].activeToggle(false);

    dots[i].onclick = () => {
        myGo(i);
        stop();
    }
}

/* work! */
function myGo(index) {
    var point = window.innerHeight * index;
    var step = 40;
    dotsUtil.activeChange(index);
    dotsUtil.colorChange(index);
    
    /* go down */
    if (point > wrapper.scrollTop) {
        var timer = setInterval(() => {
            console.log('timer work');
    
            if (wrapper.scrollTop < point) {
                console.log(point - wrapper.scrollTop);
                if ((point - wrapper.scrollTop) < step) {
                    wrapper.scrollBy(0, point - wrapper.scrollTop);
                } else {
                    wrapper.scrollBy(0, step);
                } 
            } else {
                console.log('timer end');
                clearInterval(timer);
            }
        }, 1000/60);
    }
    
    /* go up */
    if (point < wrapper.scrollTop) {
        console.log('point' + point);
        var timer = setInterval(() => {
            console.log('wrapper.scrollTop - point' + (wrapper.scrollTop - point));
            if (wrapper.scrollTop > point) {
                if ((wrapper.scrollTop - point) < step) {
                    wrapper.scrollBy(0, -(wrapper.scrollTop - point));
                } else {
                    wrapper.scrollBy(0, -step);
                } 
            } else {
                console.log('timer end');
                clearInterval(timer);
            }
        }, 1000/60);
    }
}

window.onwheel = (e) => {
    if (isTime) {
        if (e.deltaY > 0) {
            myGo(dotsUtil.getActiveDot() + 1);
            stop();
        } else {
            myGo(dotsUtil.getActiveDot() - 1);
            stop();
        } 
    }
}
goToAnchor(0);

function render(option) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction 0 -> 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // current progress
        var progress = options.timing(timeFraction)
        // animation func run
        options.draw(progress);
        // next frame
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function linear(timeFraction) {
    return timeFraction;
}

function animation(progress) {
    elem.style.width = progress * 100 + '%';
}

// example argumants of render 
/*
{
    duration: 1000,

    timing: panel.nav.linear,

    draw: animation,

    distanse: 0,

    startPos: 0
}
*/
