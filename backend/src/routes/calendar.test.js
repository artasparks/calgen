import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

describe('GET /api/calendar', () => {
  it('returns a PDF for valid params', async () => {
    const res = await request(app)
      .get('/api/calendar?year=2026&month=2&startDay=sunday')
      .buffer(true)
      .parse((res, cb) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => cb(null, Buffer.concat(chunks)));
      });

    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /application\/pdf/);
    assert.match(res.headers['content-disposition'], /attachment/);
    // PDF magic bytes
    assert.equal(res.body.subarray(0, 4).toString(), '%PDF');
  });

  it('defaults to sunday when startDay is omitted', async () => {
    const res = await request(app)
      .get('/api/calendar?year=2026&month=2');

    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /application\/pdf/);
  });

  it('returns 400 when month is missing', async () => {
    const res = await request(app)
      .get('/api/calendar?year=2026');

    assert.equal(res.status, 400);
  });

  it('returns 400 when year is missing', async () => {
    const res = await request(app)
      .get('/api/calendar?month=2');

    assert.equal(res.status, 400);
  });

  it('returns 400 for invalid startDay', async () => {
    const res = await request(app)
      .get('/api/calendar?year=2026&month=2&startDay=wednesday');

    assert.equal(res.status, 400);
  });

  it('returns 400 for month out of range', async () => {
    const res = await request(app)
      .get('/api/calendar?year=2026&month=13');

    assert.equal(res.status, 400);
  });
});
