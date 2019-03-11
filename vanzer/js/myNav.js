class myNav {
    /**
     * create instance of the class
     *
     * @constructor
     * @this  {myNav}
     * @param {object} options - list of options.
     * @param {string} options.wrapper - main wrapper selector (such as a ".wrapper").
     * @param {string} options.sections - selector for sections elements (such as ".section").
     * @param {string} options.dots - selector for navigation dots elements.
     * @param {string} options.activeStyle - css class (style) for active dots.
     * @param {string} options.activeStyle - css class (style) for disable dots.
     * @param {int|float} options.activeStyle - duartion of animation [ms].
     * @param {boolean} options.fullMode - full window or not (dont use it, not ready, only fullmode).
     * @param {function(object, array)} options.otherAction - this function run if section change, where
     * object - is an active dot element and array - all disable dots elements/
     */
    constructor(options) {
        this._wrapper = document.querySelector(options.wrapper) ||  document.documentElement;
        this._sections = document.querySelectorAll(options.sections);
        this._dots = document.querySelectorAll(options.dots);
        this._activeStyle = options.activeStyle;
        this._disableStyle = options.disableStyle;
        this._duration = options.duration || 800;
        this._otherAction = options.otherAction || false;
        this._fullMode = true;

        // full mode style
        if (this._fullMode) {
            document.body.style.overflow = 'hidden';
            this._wrapper.style.width = '100%';
            this._wrapper.style.height = '100vh';
            this._wrapper.style.overflow = 'hidden';
            this._wrapper.style.position = 'fixed';
            this._sections.forEach((section) => {  
                section.style.height = '100vh';
                section.style.width = '100%';
            });
        }

        // determine position of all sections
        this._secPos = [];
        this._sections.forEach((item) => {
            this._secPos.push(Math.round(item.getBoundingClientRect().y));
        });

        // index of current section
        this._activeSec = 0;

        // pause for animation
        this._pause = false;

        // determine user's browser
        let ua = navigator.userAgent;
        this._browser = (() => {
            if (ua.search(/Chrome/) > 0) return 'Chrome';
            if (ua.search(/Firefox/) > 0) return 'Firefox';
            if (ua.search(/Opera/) > 0) return 'Opera';
            if (ua.search(/Safari/) > 0) return 'Safari';
            if (ua.search(/MSIE/) > 0) return 'IE';
            return 'noname browser';
        })();


        // add click event for UI (dot's click)
        this._dots.forEach( (element, i) => {
            element.addEventListener('click', () => {
                this.goToSection(i);
            }, false);
        });

        // add scroll mouse wheel or two fingers touchpad event
        let scroll = [];

        window.onwheel = (e) => {

            // fix scroll inertia
            let deltaY = Math.max(-1, Math.min(1, e.deltaY));
            
            // scroll direction
            let goUp = false;
            let goDown = false;

            // push y coord to array, only 2 coord, if > 2, array clean
            scroll.push(deltaY);

            if (scroll.length == 2) {

                // for chrome
                    // for laptop touchpad
                if (this._browser === 'Chrome' && (scroll[0] + scroll[1] === 1) && (scroll[0] === 0 || scroll[1] === 0)) {
                    goDown = true;

                } else if (this._browser === 'Chrome' && (scroll[0] + scroll[1] === -1) && (scroll[0] === 0 || scroll[1] === 0)) {
                    goUp = true;

                    // for mouse wheel
                } else if (this._browser === 'Chrome' && e.deltaY === -100) {
                    goUp = true;
                    
                } else if (this._browser === 'Chrome' && e.deltaY === 100) {
                    goDown = true;
                    
                // for firefox
                } else if (e.deltaY > 1 && this._browser === 'Firefox') {
                    goDown = true;
                } else if (e.deltaY < -1 && this._browser === 'Firefox') {
                    goUp = true;

                } else {
                    goUp = false;
                    goDown = false;
                }

                scroll.length = 0;
            }
            
            // action up or down
            if (!this._pause && goDown) {       
                this.nextSection();

            } else if(!this._pause && goUp) {  
                this.prevSection();           
            }
        }

        // add smartphones touch scroll event
        // touchstart y coord
        let startY = 0;
        
        // if touch start, save y coord to startY
        this._wrapper.addEventListener('touchstart', function(e){

            // reference first touch point (ie: first finger)
            var touchobj = e.changedTouches[0];

            // get x position of touch point relative to left edge of browser
            startY = parseInt(touchobj.clientY);
        }, false);

        // if touch end, counting difference and go up or down
        this._wrapper.addEventListener('touchend', (e) => {

            // reference first touch point for this event
            var touchobj = e.changedTouches[0];
            if(!this._pause && (touchobj.clientY - startY) > 100) {
                this.prevSection();
            } else if(!this._pause && (touchobj.clientY - startY) < -100) {
                this.nextSection();
            }
        }, false);

        
        // request polinom
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       || 
                    window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame    || 
                    window.oRequestAnimationFrame      || 
                    window.msRequestAnimationFrame;
        })();

        // fix resize new coords
        window.addEventListener('resize', () => {
            location.reload();    
        });

        window.addEventListener("orientationchange", function() {
            location.reload(); 
        }, false);

        // fix reload position
        window.onload = () => {
            this.goToSection(0);
        };
        
        window.onbeforeunload = () => {
            this._wrapper.scrollTop = 0;
        };
    }

    // options is object with next param: duration, draw, timing()

    /**
     * maneges the requestAnimationFrame, add frame and counting time fraction for time function
     *
     * @function render
     * @param {object} options - list of options.
     * @param {int|float} options.duration - duration of animation, in milliseconds.
     * @param {function} options.draw - action function.
     * @param {function} options.timing - timing function, for exemple: linear, circ, quad, pow.
     */
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

    quad(timeFraction) {
        return Math.pow(timeFraction, 2);
    }

    pow(timeFraction) {
        return timeFraction*(2-timeFraction);
    }

    // animation methods
    goToSection(index) {

        // fix array exceptions
        if(index >= this._sections.length || index < 0) return;

        // set pause and delay for animation
        this._pause = true;
        setTimeout(() => {
            this._pause = false;
        }, 700);

        // set current postion and fix chrome bag, (shift to 10 or -10 px)
        let currentScroll = this._wrapper.scrollTop + (index > this._activeSec ? 10 : -10);

        // new active index
        this._activeSec = index;

        // get args for otherAction() and run him
        if (this._otherAction) {
            let _disableDots = [];
            this._dots.forEach((item, i) => {
                if (i !== this._activeSec) _disableDots.push(this._dots[i]);
            });
            this._otherAction(this._dots[this._activeSec], _disableDots, this._activeSec);
        }
        
        // set finish position and distance to new position
        let finishPoint = this._secPos[this._activeSec];
        let difference = currentScroll - finishPoint;

        // run render
        this.render({
            duration: this._duration,
            timing: this.pow,
            draw: (progress) => {
                this._wrapper.scrollTop = Math.abs(currentScroll - progress * difference);
            }
        });

        // run animation
        this.dotsAnimation();
    }

    // go to next section
    nextSection() {
        this.goToSection(this._activeSec + 1);
    }

    // go to previous section
    prevSection() {
        this.goToSection(this._activeSec - 1);
    }

    // run animation, change css class for active and disable dots
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