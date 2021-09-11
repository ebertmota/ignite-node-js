import { Prisma } from '@prisma/client';

const carsWithCarSpecification = Prisma.validator<Prisma.CarArgs>()({
  include: { specifications: true },
});

export type CarWithSpecifications = Prisma.CarGetPayload<
  typeof carsWithCarSpecification
>;
