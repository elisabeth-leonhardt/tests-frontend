import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("validar el componente navbar", () => {
  it("renderiza correctamente sin usuario", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar user='' setUser={() => console.log("setting user")}></Navbar>
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Mis Memes")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renderiza correctamente con usuario", () => {
    render(
      <BrowserRouter>
        <Navbar
          user='funny-eli'
          //   setUser={() => console.log("setting user")}
        ></Navbar>
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("funny-eli")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });
  it("renderiza correctamente con usuario", () => {
    render(
      <BrowserRouter>
        <Navbar
          user='funny-eli'
          //   setUser={() => console.log("setting user")}
        ></Navbar>
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("funny-eli")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });
});
