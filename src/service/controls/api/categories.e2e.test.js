'use strict';

const request = require(`supertest`);
const {app} = require(`../../cli/server/server`);

const checkArrayOfType = (items, type) => {
  return items.every((item) => {
    return typeof item === type;
  });
};

describe(`Categories API end-points`, () => {
  describe(`Get end-point`, () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get(`/api/categories`);
    });

    test(`When get categories status code should be 200`, () => {
      expect(res.statusCode).toBe(200);
    });

    test(`When get categories request should contain items and total`, () => {
      expect(res.body.data).toHaveProperty(`items`);
      expect(res.body).toHaveProperty(`total`);
    });

    test(`When get categories each item should had string`, () => {
      const items = res.body.data.items;
      expect(Array.isArray(items)).toBeTruthy();
      expect(checkArrayOfType(items, `string`)).toBeTruthy();
    });
  });
});
