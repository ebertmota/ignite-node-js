import { Prisma } from '@prisma/client';

const carsWithCarSpecification = Prisma.validator<Prisma.CarArgs>()({
  include: { specifications: true },
});

export type CarWithSpecifications = Prisma.CarGetPayload<
  typeof carsWithCarSpecification
>;

const CarWithImages = Prisma.validator<Prisma.CarArgs>()({
  include: { images: true },
});

export type CarWithImages = Prisma.CarGetPayload<typeof CarWithImages>;
