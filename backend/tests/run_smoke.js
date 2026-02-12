require('../server-standalone');

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    // server-standalone already starts listening synchronously
    await wait(200);

    const base = 'http://localhost:3000';

    try {
        const res = await fetch(`${base}/api/stations`);
        if (res.status !== 200) throw new Error(`/api/stations returned ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.stations) || data.stations.length === 0) throw new Error('stations response invalid');

        const firstId = data.stations[0].stationuuid;
        const one = await fetch(`${base}/api/stations/${firstId}`);
        if (one.status !== 200) throw new Error(`/api/stations/:id returned ${one.status}`);

        const postRes = await fetch(`${base}/api/stations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Smoke Test Station', url_stream: 'http://example.com/stream' })
        });
        if (postRes.status !== 201) throw new Error(`POST /api/stations returned ${postRes.status}`);

        console.log('Smoke tests passed');
        process.exit(0);
    } catch (err) {
        console.error('Smoke tests failed:', err);
        process.exit(2);
    }
}

run();
