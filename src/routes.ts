import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListReceivedComplimentsController } from './controllers/ListReceivedComplimentsController';
import { ListSentComplimentsController } from './controllers/ListSentComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedComplimentsController = new ListReceivedComplimentsController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/authenticate', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);

router.get('/users/compliments/sent', ensureAuthenticated, listSentComplimentsController.handle);
router.get(
  '/users/compliments/received',
  ensureAuthenticated,
  listReceivedComplimentsController.handle
);

export { router };
