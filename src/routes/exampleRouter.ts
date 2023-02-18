import { FastifyInstance } from "fastify/types/instance";
import { z } from "zod";
import { createExampleSchema, updateExampleSchema } from "../schema/example";
import ExampleService from "../services/exampleService";

const exampleRouter = async (fastify: FastifyInstance) => {
  const exampleService = new ExampleService();

  fastify.get("/", async (req, res) => {
    try {
      const examples = await exampleService.listExamples();

      res.status(200).send(examples);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  fastify.get("/:id", async (req, res) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    try {
      const example = await exampleService.getExample(id);

      return res.status(200).send(example);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  fastify.post("/", async (req, res) => {
    const { foo, bar } = createExampleSchema.parse(req.body);

    try {
      const example = await exampleService.createExample({ foo, bar });

      return res.status(201).send(example);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  fastify.put("/:id", async (req, res) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const { foo, bar } = updateExampleSchema.parse(req.body);

    try {
      const example = await exampleService.updateExample({ foo, bar }, id);

      return res.send(example);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  fastify.delete("/:id", async (req, res) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);

    try {
      const example = await exampleService.deleteExample(id);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};

export default exampleRouter;
