/* точки, лінії, цифри */
var dots = document.querySelectorAll('.left-nav .dot');
var lines = document.querySelectorAll('.left-nav .line');
var nums = document.querySelectorAll('.left-nav h2');
/* секції, головний блок */
var sections = document.querySelectorAll('section');
var wrapper = document.querySelector('.wrapper');
/* стилі на різних секціях */
var dotsColors = ['white', 'black', 'white', 'white', 'black', 'black'];
/* пауза */

class Dot {

    constructor(dot, line, num) {
        this.color = 'white';
        this.dot = dot;
        this.line = line;
        this.num = num;
    }

    set dotColor(color) {
        this.color = color;
        this.dot.style.backgroundColor = color;
        this.line.style.backgroundColor = color;
        this.num.style.color = color;
    }

    setActive(toggle) {
        if (!toggle) {
            this.line.style.height = '0';
            this.dot.style.opacity = '0.5';
            this.num.style.height = '0';
        } else {
            this.line.style.height = '40px';
            this.dot.style.opacity = '1';
            this.num.style.height = 'auto';
        }
    }
    
    static dotActivation(arrayOfDots, index) {
        if (index >= 0 && index < arrayOfDots.length) {
            for (let i = 0; i < arrayOfDots.length; i++) {
                if (i == index) {
                    arrayOfDots[i].setActive(true);
                } else {
                    arrayOfDots[i].setActive(false);
                }
            }
        } else {
            throw new RangeError('Your index wrong');
        }     
    }

    static changeColor(arrayOfDots, color) {
        for (let i = 0; i < arrayOfDots.length; i++) {
            arrayOfDots[i].dotColor = color;
        }
    } 
}

class Navigation {

    constructor(sections, wrapper, step, fps) {
        this.sections = sections;
        this.wrapper = wrapper || document.body;
        this.step = step || 10;
        this.fps = fps || 1000;
        this.activeDot = 0;
        this.secCoordsY = [];
        sections.forEach((item) => {
            this.secCoordsY.push(Math.round(item.getBoundingClientRect().y));
        });
    }

    render(options) {

        var start = performance.now();

        console.log('duration ' + options.duration);
        console.log('distance ' + options.distance);
    
        requestAnimationFrame(function animate(time) {
            // timeFraction 0 -> 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;
    
            // current progress
            var progress = options.timing(timeFraction);
            // animation func run
            options.draw(progress, options.startPos, options.distance);
            // next frame
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
    
    linear(timeFraction) {
        return timeFraction;
    }

    circ(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    quad(progress) {
        return Math.pow(progress, 2);
    }
    
    animation(progress, startPos, distance) {
        console.log('progress' + progress);
        console.log('startPos' + startPos);
        console.log('distance' + distance);
        console.log('res' + Math.abs(startPos - progress * distance));
        wrapper.scrollTop = Math.abs(startPos - progress * distance);
    }

    goTo(index) {
        if (index < 0 || index >= sections.length) throw new RangeError('Your index wrong');
        let lastIndex = this.activeDot;
        this.activeDot = index;
        let currentScroll = this.wrapper.scrollTop;
        let finishPoint = this.secCoordsY[this.activeDot];
        let difference = currentScroll - finishPoint;
        console.log('index' + index);
        this.render({
            duration: /*Math.abs(lastIndex - this.activeDot)*/800,
            timing: this.quad,
            draw: this.animation,
            distance: difference,
            startPos: currentScroll
        });
        
    }

    goUp() {
        this.goTo(this.activeDot - 1);
    }

    goDown() {
        this.goTo(this.activeDot + 1);
    }
}

class navPanel {
    constructor(){
        this.stop = false;
        this.dotsArray = [];
        this.isDown = false;
        this.nav = new Navigation(sections, wrapper);
        dots.forEach((item, i) => {
            this.dotsArray.push(new Dot(item, lines[i], nums[i]));

            item.onclick = () => {
                this.play(i);
            }
        });
        
        window.onwheel = (e) => {
            console.log('this.isDown : ' + this.isDown);
            console.log('e.deltaY : ' + e.deltaY);
            if(e.deltaY > 2 && !this.isDown) {
                this.isDown = true;
                setTimeout(() => {
                    console.log('timout');
                    this.isDown = false;
                }, 1000);
                this.play(this.nav.activeDot + 1);
            } else if(!this.isDown && e.deltaY < -2) {
                this.isDown = true;
                setTimeout(() => {
                    this.isDown = false;
                }, 1000);
                this.play(this.nav.activeDot - 1);
            }
        }

        var startY = 0;
        
        wrapper.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
            console.log('Status: touchstart<br> ClientX: ' + startY + 'px');
        }, false);

        wrapper.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0]; // reference first touch point for this event
            console.log('Status: touchend<br> Resting x coordinate: ' + touchobj.clientY + 'px');
            console.log('Difference: ' + (touchobj.clientY - startY) + 'px');
            if((touchobj.clientY - startY) > 100 && !panel.isDown) {
                panel.isDown = true;
                setTimeout(() => {
                    console.log('timout');
                    panel.isDown = false;
                }, 1000);
                panel.play(panel.nav.activeDot - 1);
            } else if(!panel.isDown && (touchobj.clientY - startY) < -100) {
                panel.isDown = true;
                setTimeout(() => {
                    panel.isDown = false;
                }, 1000);
                panel.play(panel.nav.activeDot + 1);
            }
        }, false);
        
       this.play(0);
    }

    play(i) {/*
        if (!this.stop) {*/
            this.nav.goTo(i);
            Dot.dotActivation(this.dotsArray, i);
            Dot.changeColor(this.dotsArray, dotsColors[i]);
        /*}*/
    }
}

panel = new navPanel();

var startY = 0;
 
wrapper.addEventListener('touchstart', function(e){
    var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
    startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
    console.log('Status: touchstart<br> ClientX: ' + startY + 'px');
}, false);

wrapper.addEventListener('touchend', function(e){
    var touchobj = e.changedTouches[0]; // reference first touch point for this event
    console.log('Status: touchend<br> Resting x coordinate: ' + touchobj.clientY + 'px');
    console.log('Difference: ' + (touchobj.clientY - startY) + 'px');
}, false);