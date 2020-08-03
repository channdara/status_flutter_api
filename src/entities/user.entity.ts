import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  gender: number;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  profile_url: string;
}
