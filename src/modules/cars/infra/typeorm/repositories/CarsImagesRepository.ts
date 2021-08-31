import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/interfaces/ICarsImagesRepository";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private respository: Repository<CarImage>;

  constructor() {
    this.respository = getRepository(CarImage);
  }
  async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.respository.create({
      carId,
      imageName,
    });

    await this.respository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
