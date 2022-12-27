import { helperFunctions } from "../utils/helperFunctions";

// 4. espiar a un módulo, por ejemplo fetch

// mockear la fecha de hoy:
beforeAll(() => {
  jest.useFakeTimers("modern");
  // jest.setSystemTime(new Date("2022-01-05T12:00:00Z")); //hoy es 5.1. del 2022 12 del mediodia
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

test.skip("testear y adelantar un timer espiando a timeout", async () => {
  //  el espia actualmente no esta funcionando, ya lo arreglo!
  // jest.spyOn(global, "setTimeout");
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

test("Obtener respuesta a la última pregunta de la vida", async () => {
  const answer =
    helperFunctions.getTheAnswerToTheUltimateQuestionOfLife("shallow thought");
  jest.runAllTimers();
  const expectedAnswer = {
    answerToTheUltimateQuestionOfLife: 42,
    Universe: 42,
    everything: 42,
    reportedDate: new Date(),
    calculatedBy: "shallow thought",
  };
  return answer.then((res) => {
    console.log(res);
    expect(res).toEqual(expectedAnswer);
  });
});

test.only("testear y adelantar un timer con promesas", () => {
  // si usan real timers, no pueden adelantarlos y el test se demora 3 segundos
  // jest.useRealTimers();
  const values = helperFunctions.getRelatedArticles(123);
  // si usan fake timers, si o si los tienen que adelantar/terminar, sino el test falla
  jest.runAllTimers();
  return values.then((res) => {
    expect(res).toContain("uid-23");
  });
});
