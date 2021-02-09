import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.id;
    const { day, month, year } = req.query;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return res.status(200).json(availability);
  };
}

export default ProviderDayAvailabilityController;
