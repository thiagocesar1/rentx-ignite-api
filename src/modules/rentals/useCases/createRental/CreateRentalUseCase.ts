import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/interfaces/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/interfaces/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable in date");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    );

    if (compare < minHours) {
      throw new AppError("Invalid returned time!");
    }
    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
