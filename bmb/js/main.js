btnNext = document.querySelector('.page-next');
btnPrev = document.querySelector('.page-prev');
main = document.querySelector('.main');

btnNext.addEventListener('click', () => {
    let currentPosition = main.scrollLeft;

    render({
        duration: 1000,
        timing: pow,
        draw: (progress) => {
            main.scrollLeft = Math.abs(currentPosition + progress * main.clientWidth);
        }
    });

}, false);

btnPrev.addEventListener('click', () => {
    let currentPosition = main.scrollLeft;

    if (currentPosition === 0) return;

    render({
        duration: 1000,
        timing: pow,
        draw: (progress) => {
            main.scrollLeft = Math.abs(currentPosition - progress * main.clientWidth);
        }
    });

}, false);

function render(options) {

    // start time
    let start = performance.now();
    
    // add new animation frame
    requestAnimationFrame(function animate(time) {

        // timeFraction 0 -> 1
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // current progress
        let progress = options.timing(timeFraction);
        if (progress < 0) progress = 0;

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

function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}

function pow(timeFraction) {
    return timeFraction*(2-timeFraction);
}