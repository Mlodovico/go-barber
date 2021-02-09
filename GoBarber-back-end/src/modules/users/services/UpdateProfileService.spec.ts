import AppError from '@shared/errors/AppError';


import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jdoe@hotmail.com',
    });

    await expect(updatedUser.name).toBe('Jane Doe');
    await expect(updatedUser.email).toBe('jdoe@hotmail.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jdoe@hotmail.com',
      old_password: '123456',
      password: '12345666'
    });

    expect(updatedUser.password).toBe('12345666');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jdoe@hotmail.com',
      password: '12345666'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jdoe@hotmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jdoe@hotmail.com',
      old_password: '1235erro',
      password: '12345666'
    })).rejects.toBeInstanceOf(AppError);
  });
});
