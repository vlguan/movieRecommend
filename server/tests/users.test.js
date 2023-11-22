const request = require('supertest');
jest.mock('mongodb');
const app = require('../routes/users')
// Test registration endpoint
describe('POST /user/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        body:{
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com'
        }
      });

    expect(response.statusCode).toBe(200);
    // Add more assertions as needed
  });

  it('should handle duplicate username', async () => {
    // Test logic for handling duplicate username
  });
});

// Test history endpoint
describe('POST /user/history', () => {
  it('should add a new search to user history', async () => {
    // Assuming you have a user with a known username in the database
    const response = await request(app)
      .post('/user/history')
      .send({
        username: 'knownusername',
        searchTerm: 'testsearch'
      });

    expect(response.statusCode).toBe(200);
    // Add more assertions as needed
  });

  it('should handle errors gracefully', async () => {
    // Test logic for handling errors
  });
});
