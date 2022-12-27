// 1. establecer el prop que recibe el componente

import { fireEvent, render, screen } from "@testing-library/react";
import { MemeCard } from "../components/MemeGrid";

let meme = {};

beforeEach(() => {
  meme = {
    title: "titulo de mi meme",
    date: "2022-03-10T03:02:07.372Z",
    tag: "javascript",
    image:
      "data:image/webp;base64,UklGRvJoAABXRUJQVlA4IOZoAABQFAKdASpgArEBPlEgj",
    id: "278a203ab46",
    likes: 30,
    username: "funny-eli",
  };
});

// 2. renderizar el componente y validar que podemos ver todo lo que queremos ver

describe("<MemeCard />", () => {
  it("renderizar el MemeCard", () => {
    render(<MemeCard meme={meme}></MemeCard>);
    expect(screen.getByText(meme.title)).toBeInTheDocument();
    expect(screen.queryByTestId("like-button")).toHaveTextContent(meme.likes);
    expect(screen.queryByTestId("filter-tag")).toHaveTextContent(meme.tag);
    expect(screen.getByRole("img", { name: meme.title })).toBeInTheDocument();
  });
});

// 3. tal vez: modificar lo que está en el objeto

// 4. y validar que podemos ver todo lo que queremos ver

it("validar un meme que fue subido hoy", () => {
  meme.likes = 0;
  meme.date = new Date();

  render(<MemeCard meme={meme}></MemeCard>);

  expect(screen.getByText("nuevo!")).toBeInTheDocument();
  expect(screen.getByText("Subido hoy por funny-eli")).toBeInTheDocument();
});

it("validar un meme que fue creado hace dos dias", () => {
  meme.likes = 0;
  const today = new Date();
  today.setDate(today.getDate() - 2);
  meme.date = today;
  render(<MemeCard meme={meme}></MemeCard>);
  expect(screen.queryByText("nuevo!")).not.toBeInTheDocument();
  expect(
    screen.getByText("Subido hace 2 dias por funny-eli")
  ).toBeInTheDocument();
});

// 6. validar un meme que fue creado hace unos dias

// 7. validar que la funcion handleLike es llamada

// 6. validar que la funcion handleLike es llamada
it("hacer click en el like", async () => {
  const handleLike = jest.fn();
  render(<MemeCard meme={meme} handleLike={handleLike}></MemeCard>);
  expect(screen.queryByTestId("like-button")).toHaveTextContent(meme.likes);
  fireEvent.click(screen.queryByTestId("like-button"));
  expect(handleLike).toHaveBeenCalledTimes(1);
  expect(handleLike).toHaveBeenCalledWith(meme);
});
