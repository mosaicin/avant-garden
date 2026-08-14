(() => {
  const plural = (n) => {
    if (n % 10 === 1 && n % 100 !== 11) return `${n} кадр`;
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} кадра`;
    return `${n} кадров`;
  };
  document.querySelectorAll('.archive-filters').forEach((panel) => {
    const grid = panel.nextElementSibling;
    if (!grid || !grid.classList.contains('archive-grid')) return;
    const cards = [...grid.querySelectorAll('.archive-card')];
    const year = panel.querySelector('[data-filter-year]');
    const series = panel.querySelector('[data-filter-series]');
    const count = panel.querySelector('[data-filter-count]');
    const reset = panel.querySelector('[data-filter-reset]');
    const params = new URLSearchParams(location.search);
    if (params.has('year')) year.value = params.get('year');
    if (params.has('series')) series.value = params.get('series');
    const apply = (writeUrl = true) => {
      const visible = cards.filter((card) => {
        const yearOk = year.value === 'all' || card.dataset.year === year.value;
        const seriesOk = series.value === 'all' || card.dataset.series === series.value;
        card.hidden = !(yearOk && seriesOk);
        return yearOk && seriesOk;
      });
      count.value = plural(visible.length);
      count.textContent = plural(visible.length);
      if (writeUrl) {
        const next = new URL(location.href);
        year.value === 'all' ? next.searchParams.delete('year') : next.searchParams.set('year', year.value);
        series.value === 'all' ? next.searchParams.delete('series') : next.searchParams.set('series', series.value);
        history.replaceState({}, '', next);
      }
    };
    year.addEventListener('change', () => apply());
    series.addEventListener('change', () => apply());
    reset.addEventListener('click', () => { year.value = 'all'; series.value = 'all'; apply(); });
    apply(false);
  });
})();
