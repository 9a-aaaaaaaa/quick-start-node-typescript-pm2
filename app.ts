import express, { Express, Request, Response } from 'express';

// replace app
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript 222');
});


export default app;

