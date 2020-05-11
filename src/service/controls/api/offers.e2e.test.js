'use strict';

const request = require(`supertest`);
const {app} = require(`../../cli/server/server`);

const newOffer = {
  title: `Продам хорошую квартиру`,
  categories: [`недвижимость`],
  sum: 1000,
  description: `некоторое описание объявление по продаже квартиры некоторое описание объявление по продаже квартиры`,
};

const newComment = {
  text: `Тестовый комментарий к объявлению`,
};

describe(`Get offers`, () => {
  let res;
  beforeAll(async () => {
    res = await request(app).get(`/api/offers`);
  });

  test(`When requesting the status of the response should be 200`, () => {
    expect(res.statusCode).toBe(200);
  });

  test(`When requesting response should contain items and total`, () => {
    expect(res.body.data).toHaveProperty(`items`);
    expect(res.body).toHaveProperty(`total`);
  });
});

describe(`Add offer`, () => {
  let resAdd;
  let addedOffer;

  beforeAll(async () => {
    resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When add offer the response status should be 200`, () => {
    expect(resAdd.statusCode).toBe(200);
  });

  test(`When add offer the response contain item`, () => {
    expect(resAdd.body.data).toHaveProperty(`item`);
  });

  test(`When add offer the response contain item contain required fields`, () => {
    const item = resAdd.body.data.item;
    expect(item).toHaveProperty(`id`);
    expect(item).toHaveProperty(`title`);
    expect(item).toHaveProperty(`categories`);
    expect(item).toHaveProperty(`sum`);
    expect(item).toHaveProperty(`description`);
  });

  test(`When add offer the response contain item equal newOffer`, () => {
    const item = resAdd.body.data.item;
    expect(item.title).toEqual(newOffer.title);
    expect(item.categories).toEqual(newOffer.categories);
    expect(item.sum).toEqual(newOffer.sum);
    expect(item.description).toEqual(newOffer.description);
  });
});

describe(`Add incorrect offer`, () => {
  let resAdd;
  const newIncorrectOffer = {...newOffer};
  const failFieldId = `categories`;
  delete newIncorrectOffer[failFieldId];

  beforeAll(async () => {
    resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newIncorrectOffer});
  });

  test(`When add incorrect offer the response status should be 400`, () => {
    expect(resAdd.statusCode).toBe(400);
  });

  test(`When add incorrect offer the response contain error with message`, () => {
    const error = resAdd.body.error;
    expect(typeof error.message).toBe(`string`);
    expect(error.message.length).toBeGreaterThan(0);
  });

  test(`When add incorrect offer the response contain fail field`, () => {
    const failFields = resAdd.body.failFields;
    expect(failFields.length).toEqual(1);
    expect(failFields[0].id).toEqual(failFieldId);
  });
});

describe(`Get offer`, () => {
  let res;
  let addedOffer;

  beforeAll(async () => {
    const resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
    res = await request(app).get(`/api/offers/${addedOffer.id}`);
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When requesting the status of the response should be 200`, () => {
    expect(res.statusCode).toBe(200);
  });

  test(`When requesting response should contain item`, () => {
    expect(res.body.data).toHaveProperty(`item`);
  });

  test(`When requesting response contain item equal newOffer and item should contain id equal addedOffer.id`, () => {
    const item = res.body.data.item;
    expect(item.id).toEqual(addedOffer.id);
    expect(item.title).toEqual(newOffer.title);
    expect(item.categories).toEqual(newOffer.categories);
    expect(item.sum).toEqual(newOffer.sum);
    expect(item.description).toEqual(newOffer.description);
  });
});

describe(`Update offer`, () => {
  let resUpdate;
  let addedOffer;
  const modifiedOffer = {
    title: `Продам хорошую квартиру 1`,
    categories: [`кварита`],
    sum: 1001,
    description: `некоторое описание объявление по продаже квартиры некоторое описание объявление по продаже квартиры \n
    некоторое описание объявление по продаже квартиры некоторое описание объявление по продаже квартиры`,
  };

  beforeAll(async () => {
    const resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
    resUpdate = await request(app)
      .put(`/api/offers/${addedOffer.id}`)
      .send({item: modifiedOffer});
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When add offer the response status should be 200`, () => {
    expect(resUpdate.statusCode).toBe(200);
  });

  test(`When add offer the response contain item`, () => {
    expect(resUpdate.body.data).toHaveProperty(`item`);
  });

  test(`When add offer the response contain item contain required fields`, () => {
    const item = resUpdate.body.data.item;
    expect(item).toHaveProperty(`id`);
    expect(item).toHaveProperty(`title`);
    expect(item).toHaveProperty(`categories`);
    expect(item).toHaveProperty(`sum`);
    expect(item).toHaveProperty(`description`);
  });

  test(`When add offer the response contain item equal newOffer`, () => {
    const item = resUpdate.body.data.item;
    expect(item.title).toEqual(modifiedOffer.title);
    expect(item.categories).toEqual(modifiedOffer.categories);
    expect(item.sum).toEqual(modifiedOffer.sum);
    expect(item.description).toEqual(modifiedOffer.description);
  });
});

describe(`Remove offer`, () => {
  let resRemove;
  let addedOffer;

  beforeAll(async () => {
    const resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
    resRemove = await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When add offer the response status should be 204`, () => {
    expect(resRemove.statusCode).toBe(204);
  });

  test(`After remove offet when requesting item the response status should be 404`, async () => {
    const res = await request(app).get(`/api/offers/${addedOffer.id}`);
    expect(res.statusCode).toBe(404);
  });
});

describe(`Get comments`, () => {
  let res;
  let addedOffer;

  beforeAll(async () => {
    const resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
    await request(app).post(`/api/offers/${addedOffer.id}/comments`)
      .send({item: newComment});
    res = await request(app).get(`/api/offers/${addedOffer.id}/comments`);
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

  test(`When requesting response.item.comments should contain array with item equal newComment`, () => {
    const items = res.body.data.items;
    expect(items.some((item) => item.text === newComment.text)).toBeTruthy();
  });
});

describe(`Add comments`, () => {
  let res;
  let addedOffer;

  beforeAll(async () => {
    const resAdd = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAdd.body.data.item;
    res = await request(app).post(`/api/offers/${addedOffer.id}/comments`)
      .send({item: newComment});
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When add comment the status of the response should be 200`, () => {
    expect(res.statusCode).toBe(200);
  });

  test(`When add offer the response contain item contain required fields`, () => {
    const item = res.body.data.item;
    expect(item).toHaveProperty(`id`);
    expect(item).toHaveProperty(`text`);
  });

  test(`When add offer the response contain item.text equal newCommentText`, () => {
    const item = res.body.data.item;
    expect(item.text).toEqual(newComment.text);
  });
});

describe(`Remove comments`, () => {
  let resRemove;
  let addedOffer;
  let addedComment;

  beforeAll(async () => {
    const resAddOffer = await request(app)
      .post(`/api/offers`)
      .send({item: newOffer});
    addedOffer = resAddOffer.body.data.item;
    const resAddedComment = await request(app).post(`/api/offers/${addedOffer.id}/comments`)
      .send({item: newComment});
    addedComment = resAddedComment.body.data.item;
    resRemove = await request(app)
      .delete(`/api/offers/${addedOffer.id}/comments/${addedComment.id}`);
  });
  afterAll(async () => {
    await request(app).delete(`/api/offers/${addedOffer.id}`);
  });

  test(`When remove comment the response status should be 204`, () => {
    expect(resRemove.statusCode).toBe(204);
  });

  test(`After remove comment when requesting comment the response items not should this comment`, async () => {
    const res = await request(app).get(`/api/offers/${addedOffer.id}/comments/`);
    const comments = res.body.data.items;
    expect(comments.some((it) => it.id === addedComment.id)).toBeFalsy();
  });
});
