import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specifactionsRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlredyExists =
      this.specifactionsRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error("Specification alredy exists!");
    }

    this.specifactionsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
