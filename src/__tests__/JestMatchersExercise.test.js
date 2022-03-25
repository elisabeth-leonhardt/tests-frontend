import { helperFunctions } from "../utils/helperFunctions";

//1. Jest Matchers
//1.1 asegurar que Jest funciona correctamente
test("validar que Jest funcione correctamente", () => {
  expect(true).toBe(true);
});

// 1.2. implementar una test suite para testear helper functions
describe("validar convertUserObjectToString", () => {
  //1.3. test para la funcion convertUserObjectToString
  it("nombre de usuario con prefijo y sufijo es concatenado correctamente", () => {
    const user = {
      first_name: "Fulano",
      last_name: "Gonzales",
      prefix: "Prof.",
      suffix: ", PhD",
    };
    expect(helperFunctions.convertUserObjectToString(user)).toBe(
      "Prof. Fulano Gonzales, PhD"
    );
  });
  //1.4. si paso un objeto vacío, la función no debería retornar undefined
  it("concatenar un nombre totalmente vacio no retorna undefined", () => {
    expect(helperFunctions.convertUserObjectToString({})).not.toBeUndefined();
  });

  it("testear y adelantar un timer", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    helperFunctions.getRelatedArticles(123);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });
});

// 1.5 la funcion avg funciona correctamente
describe("test function que calcula un promedio complicado", () => {
  it("devuelve 0 con 0 parámetros", () => {
    // usamos toEqual para números
    expect(helperFunctions.avg([])).toEqual(0);
  });
  it("retorna el promedio correcto", () => {
    // usamos toEqual para números
    expect(helperFunctions.avg([3, 4, 5])).toBeGreaterThanOrEqual(1);
  });
});

// 1.6 la función createNewUser devuelve un objeto valido
describe("createNewUser", () => {
  it("devuleve un usuario válido con parámetros", () => {
    const newUser = {
      userName: `ElisabethLeonhardt`,
      followers: 0,
      points: 0,
      biography:
        "I am a mysterious individual who has yet to fill out his biography.",
    };
    expect(
      helperFunctions.createNewUser("Elisabeth", "Leonhardt")
    ).toMatchObject(newUser);
  });
});

// 1.7 controlar que la palabra aprender es parte del array que retorna la función getImportantArray
test("getImportantArray retorna un array que contiene un determinado elemento", () => {
  expect(helperFunctions.getImportantArray()).toContain("aprender");
});
