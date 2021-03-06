import { getCustomRepository } from 'typeorm';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

class ListSentComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tagId'],
    });

    return compliments;
  }
}

export { ListSentComplimentsService };
