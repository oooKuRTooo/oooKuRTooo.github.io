class Output {

    constructor(options) {
        this._wrapper = document.querySelector(options.wrapper) ||  document.documentElement;
        this._sections = document.querySelectorAll(options.sections);
        this._dots = document.querySelectorAll(options.dots);
        this._activeStyle = options.activeStyle;
        this._disableStyle = options.disableStyle;
        this._other = options.other || false; // args [active.dot, disable dots]
        this._secPos = [];
        this._sections.forEach((item) => {
            this._secPos.push(Math.round(item.getBoundingClientRect().y));
        });
        this._activeSec = 0;
        this._pause = false;
        this._fullMode = options.mode || true;


        
        var ua = navigator.userAgent;
        
        this._browser = (() => {
            if (ua.search(/Chrome/) > 0) return 'Chrome';
            if (ua.search(/Firefox/) > 0) return 'Firefox';
            if (ua.search(/Opera/) > 0) return 'Opera';
            if (ua.search(/Safari/) > 0) return 'Safari';
            if (ua.search(/MSIE/) > 0) return 'IE';

            return 'noname browser';
        })();


        // add click event for UI
        this._dots.forEach( (element, i) => {
            element.addEventListener('click', () => {
                this.goToSection(i);
            }, false);
        });

        
        window.onscroll = () => {
            this._secPos.forEach((sec, i) => {
                if (this._wrapper.scrollTop >= sec - 400 && this._wrapper.scrollTop < sec + 400) {
                    this._activeSec = i;
                    this.dotsAnimation();
                }
            });
        }
        

        // scroll mouse wheel or two fingers touchpad
        if (this._fullMode) {

            this._wrapper.style.width = '100%';
            this._wrapper.style.height = '100vh';
            this._wrapper.style.overflow = 'hidden';
            let scroll = [];

            window.onwheel = (e) => {

                //TODO: fix scroll later pls
                const deltaY = Math.max(-1, Math.min(1, e.deltaY));
                
                let goUp = false;
                let goDown = false;
                let browser = '';
                scroll.push(deltaY);

                if (scroll.length == 2) {

                    // chrome
                    if (this._browser === 'Chrome' && (scroll[0] + scroll[1] === 1) && (scroll[0] === 0 || scroll[1] === 0)) {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 1');
                        goDown = true;

                    } else if (this._browser === 'Chrome' && (scroll[0] + scroll[1] === -1) && (scroll[0] === 0 || scroll[1] === 0)) {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 2');
                        goUp = true;

                    } else if (this._browser === 'Chrome' && e.deltaY === -100) {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 2');
                        goUp = true;

                    } else if (this._browser === 'Chrome' && e.deltaY === 100) {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 2');
                        goDown = true;
                        
                    // firefox
                    } else if (e.deltaY > 1 && this._browser !== 'Chrome') {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 3');
                        goDown = true;
                    } else if (e.deltaY < -1 && this._browser !== 'Chrome') {
                        console.log(`scroll 0 : ${scroll[0]}; scroll 1 : ${scroll[1]}`);
                        console.log('if 4');
                        goUp = true;

                    } else {
                        console.log(e.deltaY);
                        goUp = false;
                        goDown = false;
                    }

                    scroll.length = 0;
                }
                
                if (goDown && !this._pause) {
                    
                    this._pause = true;
                    setTimeout(() => {
                        this._pause = false;
                    }, 700);
                    this.nextSection();

                } else if(!this._pause && goUp) {
                    
                    this._pause = true;
                    setTimeout(() => {
                        this._pause = false;
                    }, 700);
                    this.prevSection();
                    
                }
            }

            var startY = 0;
        
            this._wrapper.addEventListener('touchstart', function(e){
                console.log('tstart');
                var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
                startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
            }, false);

            this._wrapper.addEventListener('touchend', (e) => {
                var touchobj = e.changedTouches[0]; // reference first touch point for this event
                if((touchobj.clientY - startY) > 100 && !this._pause) {
                    this._pause = true;
                    setTimeout(() => {
                        this._pause = false;
                    }, 700);
                    this.prevSection();
                } else if(!this._pause && (touchobj.clientY - startY) < -100) {
                    this._pause = true;
                    setTimeout(() => {
                        this._pause = false;
                    }, 700);
                    this.nextSection();
                }
            }, false);
        }
        
        // request polinom
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       || 
                    window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame    || 
                    window.oRequestAnimationFrame      || 
                    window.msRequestAnimationFrame;
        })();

        // fix reload position
        window.onload = () => {
            this.dotsAnimation();
        };

        window.onbeforeunload = () => {
            this._wrapper.scrollTop = 0;
        };
    }

    // options is object with next param: duration, draw, timing()
    render(options) {

        // start time
        var start = performance.now();

        // add new animation frame
        requestAnimationFrame(function animate(time) {

            // timeFraction 0 -> 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            // current progress
            var progress = options.timing(timeFraction);

            // animation func run
            options.draw(progress);

            // next frame
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    // timing functions
    linear(timeFraction) {
        return timeFraction;
    }

    circ(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    quad(progress) {
        return Math.pow(progress, 2);
    }

    pow(progress) {
        return progress*(2-progress);
    }

    // animation methods
    goToSection(index) {
        // TODO: index error
        if(index >= this._sections.length || index < 0) return;
        let currentScroll = this._wrapper.scrollTop + (index > this._activeSec ? 10 : -10);
        this._activeSec = index;

        //other
        let _disableDots = [];
        this._dots.forEach((item, i) => {
            if (i !== this._activeSec) _disableDots.push(this._dots[i]);
        });
        this._other(this._dots[this._activeSec], _disableDots);
        
        let finishPoint = this._secPos[this._activeSec];
        let difference = currentScroll - finishPoint;
        let _this = this;
        function drawFunc(progress) { 
            _this._wrapper.scrollTop = Math.abs(currentScroll - progress * difference);
        }
        this.render({
            duration: 700,
            timing: this.pow,
            draw: drawFunc
        });

        //TODO: if full mode
        //this.dotsAnimation();
    }

    nextSection() {
        this.goToSection(this._activeSec + 1);
    }

    prevSection() {
        this.goToSection(this._activeSec - 1);
    }

    dotsAnimation() {
        let _dStyle = this._disableStyle;
        let _aStyle = this._activeStyle;
        let _aSec = this._activeSec;
        this._dots.forEach(function(item, i) {
            if (_aSec == i) {
                item.classList.remove(_dStyle);
                item.classList.add(_aStyle); 
            } else {
                item.classList.remove(_aStyle);
                item.classList.add(_dStyle);     
            }   
        });
    }


}