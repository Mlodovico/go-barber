import { getRepository, Repository, Not } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProvider({
    except_user_id
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if(except_user_id) {
      users = await this.ormRepository.find({
         where: {
           id: Not(except_user_id),
         }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }


  public async findById(id: string): Promise<User| undefined> {
    const userId = await this.ormRepository.findOne(id);

    return userId;
  };


  public async findByEmail(email: string): Promise<User| undefined> {
    const userEmail = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return userEmail;
  };

  public async create({ name, email, password }: ICreateUserDTO):
  Promise<User> {
    const newUser = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(newUser);

    return newUser;
  };

  public async save(user: User): Promise<User> {
    return this.ormRepository.create(user);
  }
}

export default UsersRepository;
