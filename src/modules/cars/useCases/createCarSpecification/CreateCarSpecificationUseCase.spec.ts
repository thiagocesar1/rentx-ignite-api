import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemroy: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemroy = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemroy,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to an inexisting car", async () => {
    expect(async () => {
      const carId = "1234";
      const specificationsId = ["54321"];
      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemroy.create({
      name: "Name car",
      description: "Description car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "test",
      description: "test",
    });

    const specificationsId = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
