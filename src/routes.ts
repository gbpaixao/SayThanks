import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListReceivedComplimentsController } from './controllers/ListReceivedComplimentsController';
import { ListSentComplimentsController } from './controllers/ListSentComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedComplimentsController = new ListReceivedComplimentsController();
const listUsersController = new ListUsersController();

router.post('/authenticate', ensureAuthenticated, authenticateUserController.handle);

router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, ensureAdmin, listUsersController.handle);

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get('/tags', listTagsController.handle);

router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/users/compliments/sent', ensureAuthenticated, listSentComplimentsController.handle);
router.get(
  '/users/compliments/received',
  ensureAuthenticated,
  listReceivedComplimentsController.handle
);

export { router };
