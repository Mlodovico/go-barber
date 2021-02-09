import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendPasswordService from '@modules/users/services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
  const { email } = req.body;

  const sendForgotPasswordEmail = container.resolve(SendPasswordService);

  await sendForgotPasswordEmail.execute({
    email,
  });

  return res.status(204).json();
  }
}

export default ForgotPasswordController;
