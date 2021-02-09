import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppoitment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppoitment = new CreateAppointmentService(
    fakeAppointmentsRepository,
    fakeNotificationsRepository,
    fakeCacheProvider
    );
  });

  it('should be able to create an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppoitment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '1234566789',
      provider_id: '2354346456'
    });

    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('2354346456');
  });

  it('should be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 20, 23);

    await expect(createAppoitment.execute({
      date: appointmentDate,
      provider_id: '2354346456',
      user_id: '1234566789',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppoitment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '2354346456',
      user_id: '1234566789',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppoitment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '1234566789',
      user_id: '1234566789',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8 AM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppoitment.execute({
      date: new Date(2020, 4, 11, 6),
      provider_id: '1234566789',
      user_id: '1234566789',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 17 PM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppoitment.execute({
      date: new Date(2020, 4, 10, 19),
      provider_id: '1234566789',
      user_id: '1234566789',
    })).rejects.toBeInstanceOf(AppError);
  });
});
