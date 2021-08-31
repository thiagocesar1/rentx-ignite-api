import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (categoryId) {
      carsQuery.andWhere("c.category_id = :categoryId", { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(carId: string): Promise<Car> {
    const car = await this.repository.findOne(carId);
    return car;
  }
}

export { CarsRepository };
