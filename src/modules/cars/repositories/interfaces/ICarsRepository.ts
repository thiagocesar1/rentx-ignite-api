import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
  findById(carId: string): Promise<Car>;
}

export { ICarsRepository };
