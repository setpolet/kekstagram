const GET_DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const SEND_DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = () =>
  fetch(GET_DATA_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });

const sendData = (data) =>
  fetch(SEND_DATA_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response;
    });

export { getData, sendData };
