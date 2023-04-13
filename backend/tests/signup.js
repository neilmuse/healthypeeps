const app = require('../server'); // Import your app or server file
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const User = require('../schemas/user');

// Test data
const newUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  password: 'password123',
  phoneNumber: '1234567890',
  userType: 'normal',
};

const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  password: 'password123',
  phoneNumber: '1234567890',
  userType: 'admin',
};

describe('User API', () => {
  before(async () => {
    // Clean up test users if they exist
    await User.deleteOne({ email: newUser.email });
    await User.deleteOne({ email: adminUser.email });

    // Create an admin user for testing the login endpoint
    await User.create(adminUser);
  });

  describe('POST /api/signup', () => {
    it('should create a new user and return status 201', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send(newUser);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('User created successfully');
    });

    it('should not create a new user if a required field is missing and return status 400', async () => {
        const incompleteUser = {
            ...newUser,
            phoneNumber: undefined,
        };

        const res = await request(app)
            .post('/api/signup')
            .send(incompleteUser);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Missing required field(s)');
    });
  
    it('should not create a new user if a field has an empty string and return status 400', async () => {
        const emptyFieldUser = {
            ...newUser,
            phoneNumber: '',
        };

        const res = await request(app)
            .post('/api/signup')
            .send(emptyFieldUser);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Missing required field(s)');
    });
  
    it('should not create a new user if the email already exists and return status 400', async () => {
        const duplicateEmailUser = {
            ...newUser,
            email: adminUser.email,
        };

        const res = await request(app)
            .post('/api/signup')
            .send(duplicateEmailUser);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User already exists');
    });

  });
});

