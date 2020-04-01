'use strict';

/**
 * Отдает тело html-страницы
 * @param message
 * @return {string}
 */
const getHtml = (message) => {
  return `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Куплю. Продам</title>
      </head>
      <body>${message}</body>
    </html>`.trim();
};

/**
 * Формирует HTML ответ на запрос для сервера
 * @param res Объект res
 * @param statusCode
 * @param message Контент страницы в виде html разметки
 */
const sendHtmlResponse  = (res, statusCode, message) => {
  const template = getHtml(message);

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

module.exports = {
  sendHtmlResponse,
};
