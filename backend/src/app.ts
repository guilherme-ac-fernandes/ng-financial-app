import * as express from 'express';
// import Middlewares from './middlewares';

// Estruturação do App como classe proveniente do projeto Trybe Futebol Clube
// realizado durante o curso da Trybe
// source: https://github.com/guilherme-ac-fernandes/trybe-futebol-clube/blob/main/app/backend/src/app.ts
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (_req, res) => res.json({ ok: true }));

    // this.app.use(Middlewares.error);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
// export const { app } = new App();