import { sendContactMessage } from '#controllers';
import { validateBody } from '#middlewares';
import { contactInputSchema } from '#schemas';
import { Router } from 'express';

const contactRouter = Router();

contactRouter.post('/', validateBody(contactInputSchema), sendContactMessage);

export default contactRouter;
