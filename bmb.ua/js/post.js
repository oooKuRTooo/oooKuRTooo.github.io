socials = document.querySelectorAll(".social__li");

socials[0].addEventListener('click', () => {
  for (let i = 0; i < socials.length; i++) {
    if (i>0) {
      socials[i].classList.toggle('active');
    }
  }
});