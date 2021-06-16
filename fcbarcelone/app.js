const carouselSlide = document.querySelector('.carousel-slide');
const carouselimages = document.querySelectorAll('.carousel-slide img');


//bouton
const prev = document.querySelector('#precedent');
const next = document.querySelector('#suivant');


//counter
let counter = 1;
const size = carouselimages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + ( -size * counter) + 'px)';

//Button fonction

next.addEventListener('click', () => {
  carouselSlide.style.transition = "transform O.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = 'translateX(' + ( -size * counter) + 'px)';
  
});

prev.addEventListener('click', () => {
  carouselSlide.style.transition = "transform O.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = 'translateX(' + ( -size * counter) + 'px)';
  if(counter < 0 ){
    console.log('marche');
    
  }
});

carouselSlide.addEventListener('transitionend' , () => {
  console.log('fired');
});