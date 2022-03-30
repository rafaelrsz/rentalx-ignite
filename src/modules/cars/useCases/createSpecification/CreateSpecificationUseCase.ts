import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specifactionsRepository: SpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.specifactionsRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error("Specification alredy exists!");
    }

    await this.specifactionsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
