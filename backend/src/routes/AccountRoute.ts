import { Router } from 'express';
import AccountModel from '../models/AccountModel';
import AccountService from '../services/AccountService';
import AccountController from '../controllers/AccountController';
import Middlewares from '../middlewares';

const route = Router();

const accountModel = new AccountModel();
const accountService = new AccountService(accountModel);
const accountController = new AccountController(accountService);

route.get(
  '/:id',
  Middlewares.auth,
  (req, res, next) => accountController.findByPk(req, res, next)
);

export default route;
