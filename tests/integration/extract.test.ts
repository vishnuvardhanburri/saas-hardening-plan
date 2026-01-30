import request from 'supertest';
import app from '../../src/index.js';

describe('POST /v1/dna/extract', () => {
  it('should return 400 for invalid URL', async () => {
    const response = await request(app)
      .post('/v1/dna/extract')
      .send({
        url: 'not-a-url',
        tenant_id: '123e4567-e89b-12d3-a456-426614174000'
      });

    expect(response.status).toBe(400);
  });
});