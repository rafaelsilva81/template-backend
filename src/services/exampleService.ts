import { TypeOf, z } from "zod";
import { prisma } from "../config/prisma";
import { createExampleSchema, updateExampleSchema } from "../schema/example";

export default class ExampleService {
  async listExamples() {
    const examples = await prisma.example.findMany();

    return examples;
  }

  async getExample(id: string) {
    const example = await prisma.example.findUnique({
      where: {
        id: id,
      },
    });

    return example;
  }

  async createExample(data: z.TypeOf<typeof createExampleSchema>) {
    const example = await prisma.example.create({
      data,
    });

    return example;
  }

  async updateExample(data: z.TypeOf<typeof updateExampleSchema>, id: string) {
    const example = await prisma.example.update({
      where: {
        id: id,
      },
      data,
    });

    return example;
  }

  async deleteExample(id: string) {
    const example = await prisma.example.delete({
      where: {
        id: id,
      },
    });

    return example;
  }
}
