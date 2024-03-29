const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server.js');

let apps;

require('dotenv').config();

beforeEach(async () => {
    apps = await app();
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterEach(async () => {
    await mongoose.connection.close();
});




describe('User', () => {
    //randomize the email and password
    it('should create a new user', async () => {
        const response = await request(apps)
            .post('/api/v1/user/register')
            .send({
                name: 'Test User',
                email: 'TestEmail@gmail.com',
                password: 'TestPassword',
                phone: '871212',
            });
        expect(response.status).toBe(200);
    });
});

// describe('User', () => {
//     it('should login as an user', async () => {
//         const response = await request(apps)
//             .post('/api/v1/user/login')
//             .send({
//                 email: 'TestEmail@gmail.com',
//                 password: 'TestPassword',
//             });
//         expect(response.status).toBe(200);
//     });
// });