const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const Role = require('../models/roles.model');
const User = require('../models/user.model');
const constants = require('../config/constants.config');
const { payload, mockUserData  } = require('../../__mocks__/user.mock');

const secretKey = constants.jwtSecretKey;
const tokenExpiration = '1h';

function generateJwtToken(payload){
  const token = jwt.sign(payload, secretKey,{
    expiresIn: tokenExpiration
  });
  return token;
}

// role variable
let roleId;
let data;
/* eslint-disable no-undef */

beforeAll(async () => {
  await mongoose.connect(constants.MONGO_URL); 
 const rolExist =  await Role.findOne({ name: 'adminMock' });
 if(rolExist) roleId = rolExist._id;
  if(!rolExist) {
    data = await Role.create({ name: 'adminMock' });
    roleId = data.id;
  }
});


afterAll(async () => {
  await Role.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close(); 
});

describe('POST /api/users/signup', () => {

  it(`Should create user`, async () => {

    mockUserData[0].confirmPassword = mockUserData[0].password;
    mockUserData[0].rol = roleId;

    const response = await request(app).post('/api/users/signup').send(mockUserData[0]);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe('Mocker');
  });

});

describe('GET /api/users/', () => {

  it('should return all users', async () => {
    const response = await request(app).get('/api/users/').set(`Authorization`, `Bearer ${generateJwtToken(payload)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should handle unauthorized access without JWT token', async () => {
    const response = await request(app).get('/api/users/');
    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
  });

});