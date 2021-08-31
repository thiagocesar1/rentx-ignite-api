import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemroy: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemroy = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemroy);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemroy.create({
      name: "Car1",
      description: "Car description",
      dailyRate: 150.0,
      licensePlate: "DAD-1234",
      fineAmount: 100,
      brand: "Car Brand",
      categoryId: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemroy.create({
      name: "Car1",
      description: "Car description",
      dailyRate: 150.0,
      licensePlate: "DAD-1234",
      fineAmount: 100,
      brand: "Car_brand_test",
      categoryId: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemroy.create({
      name: "Car3",
      description: "Car description",
      dailyRate: 150.0,
      licensePlate: "DAD-1234",
      fineAmount: 100,
      brand: "Car_brand_test",
      categoryId: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemroy.create({
      name: "Car3",
      description: "Car description",
      dailyRate: 150.0,
      licensePlate: "DAD-1234",
      fineAmount: 100,
      brand: "Car_brand_test",
      categoryId: "category_id_test",
    });

    const cars = await listCarsUseCase.execute({
      categoryId: "category_id_test",
    });

    expect(cars).toEqual([car]);
  });
});
