import express from 'express';
import intToRoman from './number-utils';

const port = 8080;
const app = express();

app.use(express.json());

/** Handle CORS */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/roman', (req, res) => {
  const {arabicNumeral} = req.body;
  const romanNumeral = intToRoman(arabicNumeral);
  console.debug(`in: ${arabicNumeral} => out: ${romanNumeral}`);
  res.json(romanNumeral);
});

app.listen(port, () => {
  console.info(`Server listening on ${port}`);
});
