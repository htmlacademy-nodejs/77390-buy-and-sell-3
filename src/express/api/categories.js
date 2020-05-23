'use strict';

const {rp, getOptionsRp, getFullUrl} = require(`./request`);

const getCategories = () => {
  const url = getFullUrl(`/categories`);
  return rp(getOptionsRp(url, `GET`));
};
module.exports = {
  getCategories,
};
