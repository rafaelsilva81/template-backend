import { Router } from "express";
import { z } from "zod";
import { createExampleSchema, updateExampleSchema } from "../schema/example";
import ExampleService from "../services/exampleService";

const exampleRouter = Router();
const exampleService = new ExampleService();

exampleRouter.get("/", async (req, res) => {
  try {
    const examples = await exampleService.listExamples();

    return res.json(examples);
  } catch (err) {
    return res.status(500).json(err);
  }
});

exampleRouter.get("/:id", async (req, res) => {
  const { id } = z.object({ id: z.string() }).parse(req.params);
  try {
    const example = await exampleService.getExample(id);

    return res.json(example);
  } catch (err) {
    return res.status(500).json(err);
  }
});

exampleRouter.post("/", async (req, res) => {
  const { foo, bar } = createExampleSchema.parse(req.body);

  try {
    const example = await exampleService.createExample({ foo, bar });

    return res.status(201).json(example);
  } catch (err) {
    return res.status(500).json(err);
  }
});

exampleRouter.put("/:id", async (req, res) => {
  const { id } = z.object({ id: z.string() }).parse(req.params);
  const { foo, bar } = updateExampleSchema.parse(req.body);

  try {
    const example = await exampleService.updateExample({ foo, bar }, id);

    return res.json(example);
  } catch (err) {
    return res.status(500).json(err);
  }
});

exampleRouter.delete("/:id", async (req, res) => {
  const { id } = z.object({ id: z.string() }).parse(req.params);

  try {
    const example = await exampleService.deleteExample(id);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default exampleRouter;
