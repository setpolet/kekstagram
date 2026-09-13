import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const previewImage = document.querySelector('.img-upload__preview img');
const previewEffectImages = uploadForm.querySelectorAll('.effects__preview');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
let uploadedFileUrl;

const successMessageTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let isMessageShown = false;

const closeUploadForm = (onKeydown) => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  document.removeEventListener('keydown', onKeydown);

  if (uploadedFileUrl) {
    URL.revokeObjectURL(uploadedFileUrl);
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key !== 'Escape') {
    return;
  }

  if (isMessageShown) {
    return;
  }

  const activeElement = document.activeElement;

  if (
    activeElement === hashtagsInput ||
    activeElement === descriptionInput
  ) {
    return;
  }

  closeUploadForm(onDocumentKeydown);
};

const onUploadCloseButtonClick = () => {
  closeUploadForm(onDocumentKeydown);
};

const onUploadInputChange = () => {
  const file = uploadInput.files[0];

  if (file) {
    uploadedFileUrl = URL.createObjectURL(file);
    previewImage.src = uploadedFileUrl;

    previewEffectImages.forEach((preview) => {
      preview.style.backgroundImage = `url(${uploadedFileUrl})`;
    });
  }

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', onUploadInputChange);
closeButton.addEventListener('click', onUploadCloseButtonClick);

const isValidHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const getHashtags = (value) => {
  if (!value.trim()) {
    return [];
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

const showMessage = (messageTemplate, buttonSelector) => {
  const message = messageTemplate.cloneNode(true);
  const messageButton = message.querySelector(buttonSelector);

  isMessageShown = true;

  const messageHandlers = {
    onMessageKeydown: null,
    onMessageButtonClick: null,
    onMessageClick: null
  };

  const closeMessage = () => {
    message.remove();
    isMessageShown = false;

    messageButton.removeEventListener(
      'click',
      messageHandlers.onMessageButtonClick
    );
    message.removeEventListener(
      'click',
      messageHandlers.onMessageClick
    );
    document.removeEventListener(
      'keydown',
      messageHandlers.onMessageKeydown
    );
  };

  messageHandlers.onMessageKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  messageHandlers.onMessageButtonClick = () => {
    closeMessage();
  };

  messageHandlers.onMessageClick = (evt) => {
    if (evt.target === message) {
      closeMessage();
    }
  };

  messageButton.addEventListener(
    'click',
    messageHandlers.onMessageButtonClick
  );
  message.addEventListener(
    'click',
    messageHandlers.onMessageClick
  );
  document.addEventListener(
    'keydown',
    messageHandlers.onMessageKeydown
  );

  document.body.append(message);
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(uploadForm);

  submitButton.disabled = true;

  sendData(formData)
    .then(() => {
      submitButton.disabled = false;
      closeUploadForm(onDocumentKeydown);
      showMessage(successMessageTemplate, '.success__button');
    })
    .catch(() => {
      submitButton.disabled = false;
      showMessage(errorMessageTemplate, '.error__button');
    });
});
