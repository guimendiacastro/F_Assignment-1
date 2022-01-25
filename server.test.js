
'use strict';

const request = require('supertest');
const app = require('./server');

describe('Test the goats service', () => {


    test('GET /bball/question?Van/  returns JSON', () => {
        return request(app)
	    .get('/bball/question?Van')
	    .expect('Content-type', /json/);
    });
    test('GET /bball/question_date?2021-11-27/  returns JSON', () => {
        return request(app)
	    .get('/bball/question_date?2021-11-27')
	    .expect('Content-type', /json/);
    });
    test('GET /bball/question_time?19:00/  returns JSON', () => {
        return request(app)
	    .get('/bball/question_time?19:00')
	    .expect('Content-type', /json/);
    });

    test('POST /timetable/new succeeds', () => {
        const params = { team1: 'Van Mildert A',team2: 'Collingwood A', div: 'div2', date: '2022-01-24', time: '19:00', score: '50-45', venue: 'Sports Hall A' };
        return request(app)
        .post('/timetable/new')
        .send(params)
	    .expect(200);
    });
});
