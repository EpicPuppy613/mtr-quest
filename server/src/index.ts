import express from 'express';

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.listen("8080", () => console.log(`App listening at http://localhost:8080`));