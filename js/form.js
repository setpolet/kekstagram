import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;

    if (
      activeElement === hashtagsInput ||
      activeElement === descriptionInput
    ) {
      return;
    }

    closeUploadForm();
  }
};

const onUploadInputChange = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', onUploadInputChange);
closeButton.addEventListener('click', closeUploadForm);

const isValidHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const getHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);
  return hashtags;
};

const validateHashtagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtags(value);

  return hashtags.every((hashtag) => isValidHashtag(hashtag));
};

const validateHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtags(value);

  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagsUnique = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtags(value);
  const normalizedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());

  return new Set(normalizedHashtags).size === normalizedHashtags.length;
};

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInput,
  validateHashtagsFormat,
  'Неправильный хэштег'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsCount,
  'Нельзя указать больше пяти хэштегов'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
