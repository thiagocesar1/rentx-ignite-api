import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/interfaces/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ carId });

    return openByCar;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ userId });

    return openByUser;
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
