import { Router } from 'express';
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import Middlewares from '../middlewares';

const route = Router();

const userModel = new UserModel();
const accountModel = new AccountModel();
const userService = new UserService(userModel, accountModel);
const userController = new UserController(userService);

route.post(
  '/register',
  Middlewares.userValidations,
  (req, res, next) => userController.create(req, res, next),
);

route.post('/login', (req, res, next) => userController.login(req, res, next));

route.get(
  '/user',
  Middlewares.auth,
  (req, res, next) => userController.findAll(req, res, next),
);

export default route;
