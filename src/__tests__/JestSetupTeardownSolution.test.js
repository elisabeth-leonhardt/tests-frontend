let db;

beforeEach(() => {
  db = [
    {
      name: "elisabeth leonhardt",
      orientation: "frontend",
      languages: ["javascript", "c++"],
    },
    {
      name: "alberto urbaez",
      orientation: "tech lead",
      languages: ["php", "javascript", "go"],
    },
  ];
});

test("sobreescribir algo en la db", () => {
  // sobreescribir los lenguajes de un dev:
  db[0].languages = [];
  // ejecutar algún test con la db modificada
  expect(true).toBeTruthy();
});

test("db restaurada", () => {
  expect(db[0].languages).toContain("javascript");
});

// https://stackoverflow.com/questions/56240783/jest-understanding-execution-order-of-a-describe-and-it

describe("val", () => {
  let val;
  describe("1", () => {
    val = "1";
    it.skip("should be 1", () => {
      expect(val).toBe("1");
    });
  });

  describe("2", () => {
    val = "2";
    it("should be 2", () => {
      expect(val).toBe("2");
    });
  });
});
