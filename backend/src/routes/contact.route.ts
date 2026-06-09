import { sendContactMessage } from '#controllers';
import { validateZod } from '#middlewares';
import { contactInputSchema } from '#schemas';
import { Router } from 'express';

const contactRouter = Router();

contactRouter.post('/', validateZod(contactInputSchema), sendContactMessage);

export default contactRouter;
