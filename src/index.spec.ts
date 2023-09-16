import { tempalte } from ".";

export const ErrorCodes = {
  Error_0000: tempalte<{ hello: string; world: string }>()(
    "[Error_0000]: ${hello} ${world}"
  ),
  Error_0001: tempalte<{ uuid: string }>()(
    '[Error_0001]: File with uuid "${uuid}" did not exist in global cache.'
  ),
  Error_0002: tempalte<{ filePath: string }>()(
    '[Error_0002]: Unable to get uuid from file with filePath "${filePath}".'
  ),
  Error_0003: tempalte<{ uuid: string; path: string }>()(
    '[Error_0001]: File with uuid "${uuid}" not found in document "${path}".'
  ),
};

describe("tempalte", () => {
  describe("happy path", () => {
    it("should replace the placeholders with the provided values", () => {
      expect(
        ErrorCodes.Error_0000({ hello: "goodbye", world: "computer" })
      ).toBe("[Error_0000]: goodbye computer");
    });
    it("should replace the UUID placeholder with the provided value", () => {
      expect(ErrorCodes.Error_0001({ uuid: "12345" })).toBe(
        '[Error_0001]: File with uuid "12345" did not exist in global cache.'
      );
    });

    it("should replace the filePath placeholder with the provided value", () => {
      expect(ErrorCodes.Error_0002({ filePath: "/path/to/file" })).toBe(
        '[Error_0002]: Unable to get uuid from file with filePath "/path/to/file".'
      );
    });

    it("should replace both UUID and path placeholders with the provided values", () => {
      expect(
        ErrorCodes.Error_0003({ uuid: "12345", path: "/path/to/document" })
      ).toBe(
        '[Error_0001]: File with uuid "12345" not found in document "/path/to/document".'
      );
    });
  });

  describe("edge cases", () => {
    const generate = tempalte<any>();
    it("should return an empty string for an empty template", () => {
      const render = generate("");
      expect(render({})).toBe("");
    });

    it("should replace expressions correctly", () => {
      const render = generate("Hello ${name}! Your age is ${age}.");

      const result = render({ name: "John", age: 25 });
      expect(result).toBe("Hello John! Your age is 25.");
    });

    it("should ignore expressions without matching properties", () => {
      const render = generate("Hello ${name}! Your age is ${age}.");

      const result = render({ name: "John" });
      expect(result).toBe("Hello John! Your age is undefined.");
    });

    it("should support complex expressions", () => {
      const render = generate("${obj.method()}-${arr[0]}-${nested.obj.prop}");

      const result = render({
        obj: { method: () => "Hello" },
        arr: ["World"],
        nested: { obj: { prop: "!" } },
      });
      expect(result).toBe("Hello-World-!");
    });
  });
});
