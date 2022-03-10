import React from "react";
import { useQuery } from "react-query";

async function fetchMemes() {
  return await fetch("http://localhost:8000/memes").then((response) =>
    response.json()
  );
}

function MemeList(props) {
  const { data } = useQuery("getMemes", fetchMemes, {
    keepPreviousData: true,
  });
  return <div>hola memes!</div>;
}

export default MemeList;
