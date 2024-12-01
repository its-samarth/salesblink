import app from '../app';
import request from 'supertest';

describe('Email Scheduler API', () => {
  it('should schedule an email', async () => {
    const token = 'your_test_token'; // Mock or generate a valid token for testing
    const response = await request(app)
      .post('/api/emails/schedule')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Email scheduled successfully');
  });
});
