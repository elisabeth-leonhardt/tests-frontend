import React from "react";

const filters = ["backend", "frontend", "javascript", "testing", "python"];

function CategoryFilter(props) {
  return (
    <div className='shadow-md shadow-dark-background flex flex-col gap-4 p-4 self-start sticky top-0'>
      <h1 className='text-xl text-bitlogic-blue'>Filtros:</h1>
      {filters.map((item) => {
        return <a className='text-black uppercase block'>{item}</a>;
      })}
    </div>
  );
}

export default CategoryFilter;
