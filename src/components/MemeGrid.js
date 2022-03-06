import React from "react";
import { useQuery } from "react-query";

async function fetchMemes() {
  return await fetch("http://localhost:8000/memes").then((response) =>
    response.json()
  );
}

function MemeGrid(props) {
  const { data } = useQuery("getMemes", fetchMemes, {
    keepPreviousData: true,
  });
  console.log(data);
  return (
    <div className="grid grid-cols-2 gap-4">
      {data &&
        data.map((meme) => (
          <div className="border-2 border-red-600">
            <p>{meme?.title}</p>
            {meme?.likes > 0 && <span>Me gusta: {meme?.likes}</span>}
            <img src={meme.image} alt={meme.title} />
            <p>Subido el -fecha- por {meme.username}</p>
          </div>
        ))}
    </div>
  );
}

export default MemeGrid;
