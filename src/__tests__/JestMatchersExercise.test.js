import { uid } from "uid";
import { helperFunctions } from "../utils/helperFunctions";

//1. Jest Matchers

//1.1 asegurar que Jest funciona correctamente

test("validar que Jest funcione correctamente", () => {
  expect(true).toBeTruthy();
});

//1.2. implementar una test suite para testear helper functions

describe("validar funciones el el helper functions object", () => {
  test("nombre de usuario con prefijo y sufijo es concatenado correctamente", () => {
    const user = {
      first_name: "Fulano",
      last_name: "Gonzales",
      prefix: "Prof.",
      suffix: ", PhD",
    };
    const newUser = helperFunctions.convertUserObjectToString(user);
    expect(newUser).toBe("Prof. Fulano Gonzales, PhD");
  });
  test("pasar un objeto vacio", () => {
    expect(helperFunctions.convertUserObjectToString({})).not.toBeUndefined();
  });
});

//1.3. test para la funcion convertUserObjectToString

//1.4. si paso un objeto vacío como param, la función no debería retornar undefined

// 1.5 la funcion avg funciona correctamente
describe("probar average function", () => {
  expect(helperFunctions.avg([2, 3, 4])).toBeLessThan(5);
});

// 1.6 la función createNewUser devuelve un objeto valido

test("usuario nuevo es creado correctamente", () => {
  const newUser = {
    userName: `RominaHaag`,
    followers: 0,
    points: 0,
    biography:
      "I am a mysterious individual who has yet to fill out his biography.",
  };
  expect(helperFunctions.createNewUser("Romina", "Haag")).toMatchObject(
    newUser
  );
});

// ejercicio: 1.7 controlar que la palabra aprender es parte del array que retorna la función getImportantArray

test("evaluar si el array conteiene una palabra", () => {
  expect(helperFunctions.getImportantArray()).toContain("aprender");
});
