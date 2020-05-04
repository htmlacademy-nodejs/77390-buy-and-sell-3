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


const _getField = (error, message) => {
  const id = error.dataPath ? error.dataPath.split(`/`)[1] : error.params.missingProperty;
  return {
    id,
    message,
  };
};
/**
 * Формирование полей с ошибками на основе ошибок avj
 * @param {{}} errors Ошибки валидации ajv
 * @return {{id: string, message: string}[]} Поля с ошибкам
 */
const getFailFields = (errors) => {
  const result = [];
  errors.forEach((error) => {
    const message = error.message;
    if (error.params && error.params.errors && error.params.errors.length) {
      result.push(...error.params.errors.map((e) => _getField(e, message)));
    } else {
      result.push(_getField(error, message));
    }
  });
  return result;
};

module.exports = {
  getSuccessResponse,
  getItemsSuccessResponse,
  getItemSuccessResponse,
  getErrorResponse,
  getFailFields,
};
