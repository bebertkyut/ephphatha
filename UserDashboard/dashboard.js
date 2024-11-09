let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let refreshInterval;

let lengthItems = items.length - 1;
let active = 0;


function startAutoplay() {
    refreshInterval = setInterval(() => {
        active = (active + 1) <= lengthItems ? active + 1 : 0; 
        reloadSlider(); 
    }, 3000);
}


function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');
}

const playPauseBtn = document.querySelector('.play-pause-btn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

playPauseBtn.addEventListener('click', () => {
    if (playIcon.style.display === 'none') {

        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        startAutoplay(); 
    } else {

        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        clearInterval(refreshInterval); 
    }
});


startAutoplay();