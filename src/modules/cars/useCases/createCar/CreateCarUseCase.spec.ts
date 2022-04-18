import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Desc",
      daily_rate: 10,
      license_plate: "ABC-2034",
      fine_amount: 102,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create with an existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Test Desc",
        daily_rate: 10,
        license_plate: "ABC-2034",
        fine_amount: 102,
        brand: "Brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Test Desc",
        daily_rate: 10,
        license_plate: "ABC-2034",
        fine_amount: 102,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with avaliable true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Desc",
      daily_rate: 10,
      license_plate: "ABCD-2034",
      fine_amount: 102,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
