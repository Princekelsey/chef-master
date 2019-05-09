let slideImages = document.querySelectorAll('.slide'),
    arrowRight = document.querySelector('#arrow-right'),
    arrowLeft = document.querySelector('#arrow-left')
    

const auto = true;
const intervalTime = 5000;
let slideInterval;

// get the next slide image
const next = () => {
    const current = document.querySelector('.act');
    current.classList.remove('act');
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add('act');
    } else {
        slideImages[0].classList.add('act');
    };
    setTimeout(()=> current.classList.remove('act'))
};

// get the previous slide image
const prev = () => {
    const current = document.querySelector('.act');
    current.classList.remove('act');
    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add('act');
    } else {
        slideImages[slideImages.length - 1].classList.add('act');
    };
    setTimeout(()=> current.classList.remove('act'))
};

arrowRight.addEventListener('click', () => {
    next();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(next, intervalTime); 
    }
});
arrowLeft.addEventListener('click', () => {
    prev();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(next, intervalTime); 
    }
});

if (auto) {
      slideInterval = setInterval(next, intervalTime)   
   }




