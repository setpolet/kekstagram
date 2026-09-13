const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentItem = bigPicture.querySelector('.social__comment');

const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

let comments = [];
let shownComments = 0;

const renderComments = () => {
  commentsContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const commentsToShow = comments.slice(0, shownComments);

  commentsToShow.forEach(({ avatar, name, message }) => {
    const comment = commentItem.cloneNode(true);

    const commentAvatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;

    fragment.append(comment);
  });

  commentsContainer.append(fragment);

  shownCommentsCount.textContent = shownComments;
};

const onCommentsLoaderClick = () => {
  shownComments += COMMENTS_STEP;

  if (shownComments >= comments.length) {
    shownComments = comments.length;
    commentsLoader.classList.add('hidden');
  }

  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

const onBigPictureCloseButtonClick = () => {
  closeBigPicture();
};

function onDocumentEscapeKeydown(evt) {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  document.addEventListener('keydown', onDocumentEscapeKeydown);

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');

  bigPictureImage.src = picture.url;

  likesCount.textContent = picture.likes;

  totalCommentsCount.textContent = picture.comments.length;

  comments = picture.comments;
  shownComments = Math.min(COMMENTS_STEP, comments.length);

  caption.textContent = picture.description;

  renderComments();

  bigPicture
    .querySelector('.social__comment-count')
    .classList.remove('hidden');

  commentsLoader.classList.remove('hidden');

  if (shownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

closeButton.addEventListener('click', onBigPictureCloseButtonClick);

export { openBigPicture };
