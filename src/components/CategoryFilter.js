import React from "react";
import { filters } from "./filters";

function CategoryFilter({ filterContent, setFilterContent }) {
  return (
    <div className='shadow-md shadow-dark-background flex flex-col gap-4 p-4 self-start sticky top-0 rounded'>
      <h1 className='text-xl text-bitlogic-blue'>Filtros:</h1>
      <button
        className={
          filterContent === ""
            ? "text-bitlogic-blue uppercase underline text-left"
            : "text-black uppercase hover:underline text-left"
        }
        onClick={() => setFilterContent("")}
      >
        Sin Filtro
      </button>
      {filters.map((item) => {
        return (
          <button
            className={
              filterContent === item
                ? "text-bitlogic-blue uppercase underline text-left"
                : "text-black uppercase hover:underline text-left"
            }
            onClick={(e) => setFilterContent(e.target.innerHTML)}
            key={item}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
