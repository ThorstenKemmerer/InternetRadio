const request = require('supertest');
const app = require('../server-standalone');

describe('Backend API (standalone)', () => {
    it('GET /api/stations returns an array of stations', async () => {
        const res = await request(app).get('/api/stations');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /api/stations/:id returns station or 404', async () => {
        const all = await request(app).get('/api/stations');
        const first = all.body[0];
        const res = await request(app).get(`/api/stations/${first.stationuuid}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('stationuuid', first.stationuuid);
    });

    it('POST /api/stations creates a station', async () => {
        const newStation = { name: 'Test Station', url_stream: 'http://example.com/stream' };
        const res = await request(app).post('/api/stations').send(newStation);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('name', 'Test Station');
        expect(res.body).toHaveProperty('url_stream');
    });
});
