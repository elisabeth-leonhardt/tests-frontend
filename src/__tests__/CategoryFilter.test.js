import { render } from "@testing-library/react";
import CategoryFilter from "../components/CategoryFilter";

describe("<CategoryFiter />", () => {
  it("Filtro renderiza correctamente", () => {
    render(<CategoryFilter></CategoryFilter>);
  });

  it("probar jest solo", () => {
    expect(2 + 2).toBe(5);
  });
});
