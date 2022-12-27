import React, { useEffect, useState } from "react";

function InterviewComponent() {
  const [apiData, setApiData] = useState({});

  useEffect(async () => {
    const data = await fetch(`http://localhost:8000/memes`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    setApiData(data);

    return data;
  }, []);

  return <div>Hola Juan</div>;
}

export default InterviewComponent;
