import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsReposiotry: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAleradyExists = await this.specificationsReposiotry.findByName(
      name
    );
    if (specificationAleradyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationsReposiotry.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
