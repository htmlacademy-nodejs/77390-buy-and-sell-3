/**
 * Утилиты для формирования ответов API сервера в единообразном виде
 */
'use strict';

/**
 * Отдается сформированный успешный ответ
 * @param {object} data Основные данные
 * @param {object=} others Вспомогательные данные
 * @return {{data: object}}
 */
const getSuccessResponse = (data, others = {}) => {
  return {
    data,
    ...others,
  };
};

/**
 * Отдается сформированный успешный ответ со списком сущностей
 * @param {array} items Список сущностей
 * @param {object=} others Вспомогательные данные
 * @return {{data: object}}
 */
const getItemsSuccessResponse = (items, others = {}) => {
  return getSuccessResponse({items}, others);
};

/**
 * Отдается сформированный успешный ответ с единой сущностью
 * @param {*} item Данные сущности
 * @param {object=} others Вспомогательные данные
 * @return {{data: object}}
 */
const getItemSuccessResponse = (item, others = {}) => {
  return getSuccessResponse({item}, others);
};

/**
 * Отдатеся сформированный ответ с ошибкой
 * @param {string} message
 * @param {number} status
 * @param {object=} others
 * @return {{error: {message: string, status: number}}}
 */
const getErrorResponse = (message, status, others = {}) => {
  return {
    error: {
      message,
      status,
    },
    ...others,
  };
};

module.exports = {
  getSuccessResponse,
  getItemsSuccessResponse,
  getItemSuccessResponse,
  getErrorResponse,
};
