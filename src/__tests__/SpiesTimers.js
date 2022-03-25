import { helperFunctions } from "../utils/helperFunctions";

// 4. espiar a un módulo, por ejemplo fetch

// mockear la fecha de hoy:
beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2022-01-05T12:00:00Z")); //hoy es 5.1. del 2022 12 del mediodia
});

test("espiar y mockear fetch", async () => {
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

test("testear y adelantar un timer", async () => {
  jest.spyOn(global, "setTimeout");

  helperFunctions.getRelatedArticles(123);
  jest.runAllTimers();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
});

//fijar la hora del sistema para que siempre devuelva el mismo valor a la hora de llamar Date()
test("validar creación de un usuario con fecha", () => {
  const newUser = helperFunctions.createNewUser("dan", "abramov");
  console.log(newUser);
  expect(newUser.created).toEqual(new Date());
});
