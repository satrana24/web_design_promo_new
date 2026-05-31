document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('reviewsSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.review-card');
  const viewport = document.querySelector('.reviews-viewport');

  let currentIndex = 0;

  function getVisibleCards() {
    const cardWidth = cards[0].offsetWidth;

    const sliderStyles = window.getComputedStyle(slider);
    const gap = parseInt(sliderStyles.columnGap) || 0;

    return Math.round(
      viewport.offsetWidth / (cardWidth + gap)
    );
  }

  function updateSlider() {
    const totalCards = cards.length;

    const cardWidth = cards[0].offsetWidth;

    const sliderStyles = window.getComputedStyle(slider);
    const gap = parseInt(sliderStyles.columnGap) || 0;

    const visibleCards = getVisibleCards();

    const maxIndex = totalCards - visibleCards;

    const totalWidth =
      totalCards * cardWidth +
      (totalCards - 1) * gap;

    let offset;

    if (currentIndex >= maxIndex) {
      currentIndex = maxIndex;

      offset = totalWidth - viewport.offsetWidth;
    } else {
      offset = currentIndex * (cardWidth + gap);
    }

    slider.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);

  updateSlider();
});