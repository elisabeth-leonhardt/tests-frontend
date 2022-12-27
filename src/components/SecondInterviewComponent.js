import React, { useState } from "react";

function SecondInterviewComponent() {
  const [componentState, setComponentState] = useState();

  function createObject() {
    const user = {};
    setComponentState(user);
    setComponentState(user);
    setComponentState(user);
    if (!componentState.name) {
      setComponentState({ ...componentState, name: "Juan" });
    }

    if (!componentState.hobbies) {
      setComponentState({
        ...componentState,
        hobbies: "Mirar series y videojuegos",
      });
    }
  }

  createObject();
  console.log(componentState);
  // {hobbies: "mirar series y videojuegos"}

  return <div>Hola otra vez Juan!</div>;
}

export default SecondInterviewComponent;
