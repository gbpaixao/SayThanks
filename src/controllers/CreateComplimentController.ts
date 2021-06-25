import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, user_receiver, tag_id } = request.body;
    const { user_id: user_sender } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      message,
      user_receiver,
      user_sender,
      tag_id,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
