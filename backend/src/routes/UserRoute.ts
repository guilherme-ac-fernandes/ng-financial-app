import { Router } from 'express';
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const route = Router();

const userModel = new UserModel();
const accountModel = new AccountModel();
const userService = new UserService(userModel, accountModel);
const userController = new UserController(userService);

route.post('/', (req, res, next) => userController.create(req, res, next));

export default route;