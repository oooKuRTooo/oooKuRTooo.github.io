// create myNav object
let control = new myNav({
    wrapper: '#wrapper',
    sections: '.section',
    dots: '.dot',
    activeStyle: 'dot-active',
    disableStyle: 'dot-disable',
    duration: 1000,
    otherAction: dotsAnimation
});

// animation for otherAction
let lines = document.querySelectorAll('.line');
let nums = document.querySelectorAll('.num');

function dotsAnimation(activeDot, disableDots, index) {

    lines[index].classList.add('line-active');
    nums[index].classList.add('num-active');

    lines.forEach((line, i) => {
        if (i !== index) {
            line.classList.remove('line-active');
            nums[i].classList.remove('num-active');
        }
    });
}

