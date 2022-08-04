import express from 'express';
import intToRoman from './number-utils';
import { ServerSideEventService } from './server-side-event.service';

const port = 8080;
const app = express();
const sseService: ServerSideEventService<string> = new ServerSideEventService<string>();

app.use(express.json());

/** Handle CORS */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/roman', (req, res) => {
  const {arabicNumeral} = req.body;
  const { id } = req.query as any;
  res.json({});

  const romanNumeral = intToRoman(arabicNumeral);
  console.debug(`in: ${arabicNumeral} => out: ${romanNumeral}`);
  sseService.publish(id,romanNumeral);
});

app.get('/events/id', (req, res) => {
  const id = ServerSideEventService.getEventId();
  console.debug(`Client event getting id: ${id}`);
  res.json(id);
});

app.get('/events/subscribe', (req, res) => {
  const { id } = req.query as any;
  if (id == null) return;

  console.debug(`Subscribing client id: ${id} for events`);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  sseService.subscribe(id, (romanNumeral: string) => {
    console.debug(`Sendind client id: ${id} value: ${romanNumeral}`);
    res.write(`data: ${JSON.stringify({result: romanNumeral})}\n\n`);
  });

  // Clear listener
  req.on('close', function() {
    console.debug(`Closing client id: ${id}`);
    sseService.unsubscribe(id);
  });
});

app.listen(port, () => {
  console.info(`Server listening on ${port}`);
});
