import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository";

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
      throw new AppError("Specification alredy exists!");
    }

    await this.specifactionsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
