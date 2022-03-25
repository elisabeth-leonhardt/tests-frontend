import { uid } from "uid";
import { helperFunctions } from "../utils/helperFunctions";

jest.mock("uid");

// 1. async-await: validar que el chiste llega correctamente
test.skip("obtener un chiste aleatorio", async () => {
  const joke = await helperFunctions.getRandomDadJoke();
  expect(joke.status).toEqual(200);
});

// 2. mockear la función del chiste
test("obtener un chiste mockeado", async () => {
  helperFunctions.getRandomDadJoke = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 300,
      id: 123,
      joke: "Why did the worker get fired from the orange juice factory? Lack of concentration.",
    })
  );
  const joke = await helperFunctions.getRandomDadJoke();
  expect(joke.status).toEqual(300);
  expect(joke.joke).toBe(
    "Why did the worker get fired from the orange juice factory? Lack of concentration."
  );
  expect(helperFunctions.getRandomDadJoke).toHaveBeenCalledTimes(1);
  expect(helperFunctions.getRandomDadJoke).toHaveBeenCalledWith();
});

// 3. mockear un módulo
test.skip("crear un usuario", () => {
  uid.mockImplementation(() => 123);
  const newUser = helperFunctions.createNewUser("Sherlok", "Holmes");
  expect(newUser.id).toEqual(123);
});

// 4. espiar a un módulo, por ejemplo fetch

test.skip("espiar y mockear fetch", async () => {
  const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ status: 200, id: 123, joke: "very funny joke" }),
    })
  );

  const joke = await helperFunctions.getRandomDadJoke();
  console.log(joke);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
});
