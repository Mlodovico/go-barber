import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllProvider({
    except_user_id
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

      if(except_user_id) {
        users = this.users.filter(user => user.id !== except_user_id);
      }

    return users;
  }

  public async findById(id: string): Promise<User| undefined> {
    const userId = this.users.find(user => user.id === id);

    return userId;
  };


  public async findByEmail(email: string): Promise<User| undefined> {
    const userEmail = this.users.find(user => user.email === email);

    return userEmail;
  };

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData)

    this.users.push(user);

    return user;
  };

  public async save(user: User): Promise<User> {
    const findByIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findByIndex] = user;

    return user;
  }
}

export default UsersRepository;
