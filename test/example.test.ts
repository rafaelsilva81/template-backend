import ExampleService from "../src/services/exampleService";

const exampleService = new ExampleService();

test("should return a list of existing examples", () => {
  const examples = exampleService.listExamples();

  expect(examples).resolves.toMatchObject([
    {
      id: "some-id",
      foo: "foo",
    },
    {
      id: "some-other-id",
      foo: "foo",
      bar: "bar",
    },
    {},
  ]);
});
