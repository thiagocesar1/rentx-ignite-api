import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
