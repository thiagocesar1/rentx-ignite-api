import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ISpecificationsCategoryDTO,
  ISpecificationsRepository,
} from "../interfaces/ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }

  async create({
    name,
    description,
  }: ISpecificationsCategoryDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationRepositoryInMemory };
