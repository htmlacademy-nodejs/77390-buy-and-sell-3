'use strict';

const request = require(`supertest`);
const {app} = require(`../../cli/server/server`);

describe(`Search API end-points`, () => {
  let res;
  const newOffer = {
    title: `Продам хорошую квартиру`,
    categories: [`недвижимость`],
    sum: 1000,
    description: `некоторое описание объявление по продаже квартиры некоторое описание объявление по продаже квартиры`,
  };
  let addedOffer;
  beforeAll(async () => {
    await request(app).post(`/api/offers`)
      .send({item: newOffer})
      .then((response) => {
        addedOffer = response.body.data.item;
      });
    res = await request(app).get(encodeURI(`/api/search?query=${newOffer.title}`));
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When requesting the status of the response should be 200`, () => {
    expect(res.statusCode).toBe(200);
  });

  test(`When requesting response should contain items and total`, () => {
    expect(res.body.data).toHaveProperty(`items`);
    expect(res.body).toHaveProperty(`total`);
  });

  test(`When requesting response.items should contain added offer`, () => {
    const items = res.body.data.items;
    expect(items).toEqual(expect.arrayContaining([addedOffer]));
  });
});
