import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tag } from './Tag';
import { User } from './User';
import { v4 as uuid } from 'uuid';

@Entity('compliments')
class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_receiver' })
  user_receiver: User;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag_id: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Compliment };
