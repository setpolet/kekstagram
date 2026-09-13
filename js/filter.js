import { renderPictures, clearPictures } from './pictures.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

let activeFilterButton = defaultFilterButton;

const setActiveFilter = (button) => {
  activeFilterButton.classList.remove('img-filters__button--active');

  button.classList.add('img-filters__button--active');

  activeFilterButton = button;
};

const getRandomPhotos = (photos) => {
  const shuffledPhotos = [...photos].sort(() => Math.random() - 0.5);

  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => [...photos].sort(
  (a, b) => b.comments.length - a.comments.length
);

const renderFilteredPictures = debounce((pictures) => {
  clearPictures();
  renderPictures(pictures);
});

const initFilters = (photos) => {
  defaultFilterButton.addEventListener('click', () => {
    setActiveFilter(defaultFilterButton);
    renderFilteredPictures(photos);
  });
  randomFilterButton.addEventListener('click', () => {
    setActiveFilter(randomFilterButton);
    renderFilteredPictures(getRandomPhotos(photos));
  });
  discussedFilterButton.addEventListener('click', () => {
    setActiveFilter(discussedFilterButton);
    renderFilteredPictures(getDiscussedPhotos(photos));
  });
};

export { getRandomPhotos, getDiscussedPhotos, initFilters };
