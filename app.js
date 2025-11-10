import express from 'express';
const app = express();
const hostname = 'localhost';
const port = 3000;

app.get('/api/v1/cat', (request, response) => {
  const responseData = {
    cat_id: 1,
    name: 'Garfield',
    birthdate: '2.10.2012',
    weight: 8,
    owner: 'John',
    image: 'https://loremflickr.com/320/240/cat',
  };
  response.json(responseData);
});

app.use('/public', express.static('public'));

// Start the server
app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
