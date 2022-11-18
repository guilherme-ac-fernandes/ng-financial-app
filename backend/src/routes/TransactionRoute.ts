import { Router } from 'express';
import TransactionModel from '../models/TransactionModel';
import AccountModel from '../models/AccountModel';
import TransactionService from '../services/TransactionService';
import TransactionController from '../controllers/TransactionController';
import Middlewares from '../middlewares';

const route = Router();

const accountModel = new AccountModel();
const transactionModel = new TransactionModel();
const transactionService = new TransactionService(transactionModel, accountModel);
const transactionController = new TransactionController(transactionService);

route.post('/', Middlewares.auth, (req, res, next) =>
  transactionController.create(req, res, next)
);

export default route;
