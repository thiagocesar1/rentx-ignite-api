import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationsCategoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  create({
    name,
    description,
  }: ISpecificationsCategoryDTO): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationsCategoryDTO };
