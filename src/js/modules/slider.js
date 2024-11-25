function slide() {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.reviews-slide');
  let totalCards = cards.length;
  const slider = document.querySelector('.reviews-slider__list');
  const nextBtn = document.querySelector('.reviews-slider__next');
  const prevBtn = document.querySelector('.reviews-slider__prev');
  const dotsContainer = document.querySelector('.reviews-slider__dots');
  let visibleCards = 0; 
  let total = 0

  function updateSlider() {
    if (window.innerWidth >= 1250) { 
      visibleCards = 2
      totalCards = cards.length - 2
    } else if (window.innerWidth >= 768) { 
      visibleCards = 1;
      totalCards = cards.length - 1
    } else {  
      visibleCards = 0;
      totalCards = cards.length 
    }

    if( totalCards != total) {
      createPagination()
    }

    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) * 2;
    if (currentIndex >= totalCards ) {
      slider.style.transform = `translateX(-${(totalCards - 1)  * cardWidth}px)`;
    } else {
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    const dots = document.querySelectorAll('.reviews-slider__dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (currentIndex >= dots.length) {
      dots[dots.length - 1].classList.add('active');
    } else {
      dots[currentIndex].classList.add('active');
    }
  }

  function createPagination() {
    dotsContainer.innerHTML = '';
    total = totalCards
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('div');
      dot.classList.add('reviews-slider__dot');
      dot.addEventListener('click', () => {
          currentIndex = i;
          updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalCards - 1;
    }
    updateSlider();
  });

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX) {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalCards - 1;
      }
    }
    updateSlider();
  });

  window.addEventListener('resize', updateSlider); 
  createPagination();
}

export default slide;