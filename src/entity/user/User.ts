import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  username!: string;

  @Column('text')
  password!: string;
}
