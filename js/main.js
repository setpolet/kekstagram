import './form.js';
import { renderPictures } from './pictures.js';
import { createPhotos } from './photos.js';

const photos = createPhotos();

renderPictures(photos);
