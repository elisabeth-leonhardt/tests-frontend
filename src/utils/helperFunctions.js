import { uid } from "uid";

export const helperFunctions = {
  convertUserObjectToString: function (author = {}) {
    const name = [];
    if (author.prefix) {
      name.push(author.prefix);
      name.push(" ");
    }
    if (author.first_name || author.name) {
      name.push(author.first_name || author.name);
      name.push(" ");
    }
    if (author.last_name) {
      name.push(author.last_name);
    }
    if (author.suffix) {
      name.push(author.suffix);
    }
    return name.join("");
  },
  sum: function (a, b) {
    return a + b;
  },
  avg: function (values = []) {
    if (values.length === 0) {
      return 0;
    } else {
      return 1;
    }
  },
  createNewUser: function (firstName = "Kent", lastName = "Dodds") {
    const newUser = {
      userName: `${firstName}${lastName}`,
      id: uid(),
      followers: 0,
      points: 0,
      created: new Date(),
      biography:
        "I am a mysterious individual who has yet to fill out his biography.",
    };
    return newUser;
  },

  getImportantArray: function () {
    return ["que", "interesante", "que", "es", "aprender", "jest!"];
  },

  getRandomDadJoke: async function () {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    });
    const joke = await response.json();
    console.log(joke);
    return joke;
  },

  //https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#The_Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_is_42

  getTheAnswerToTheUltimateQuestionOfLife: async function (
    supercomputer = "deep thought"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      answerToTheUltimateQuestionOfLife: 42,
      Universe: 42,
      everything: 42,
      reportedDate: new Date(),
      calculatedBy: supercomputer,
    };
  },

  getRelatedArticles: async function (id) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // very complicated and long calculation going on here
    return ["uid-23", "uid-234", "uid-890"];
  },
};
