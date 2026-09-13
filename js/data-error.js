const DATA_ERROR_TIMEOUT = 5000;

const dataErrorTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);

  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_TIMEOUT);
};

export { showDataError };
