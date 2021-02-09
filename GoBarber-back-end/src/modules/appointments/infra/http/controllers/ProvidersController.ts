import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id =req.user.id

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return res.status(200).json(classToClass(providers));
  };
}

export default ProvidersController;
