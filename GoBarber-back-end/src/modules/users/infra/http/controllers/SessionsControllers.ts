import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsControllers {
  public async create(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const authenticaUser = container.resolve(AuthenticateUserService)

  const { user, token } = await authenticaUser.execute({
    email,
    password,
  });

  return res.json({user: classToClass(user), token});
  }
}

export default SessionsControllers;
