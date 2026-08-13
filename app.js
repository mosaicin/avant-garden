(() => {
  const track = document.querySelector('#carouselTrack');
  if (!track) return;
  const slides = [...track.children];
  const counter = document.querySelector('#carouselCounter');
  const prev = document.querySelector('.carousel-control.prev');
  const next = document.querySelector('.carousel-control.next');
  let index = 0;
  let touchStart = null;
  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  const move = (direction) => {
    index = (index + direction + slides.length) % slides.length;
    render();
  };
  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') move(1);
  });
  track.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientY; }, { passive: true });
  track.addEventListener('touchend', (event) => {
    if (touchStart === null) return;
    const delta = event.changedTouches[0].clientY - touchStart;
    if (Math.abs(delta) > 35) move(delta > 0 ? -1 : 1);
    touchStart = null;
  }, { passive: true });
  render();
})();