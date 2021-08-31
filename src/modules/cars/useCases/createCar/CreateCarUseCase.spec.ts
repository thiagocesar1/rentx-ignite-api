import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with a license plate exists", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
      await createCarUseCase.execute({
        name: "Car2",
        description: "Description car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });
    expect(car.available).toBe(true);
  });
});
