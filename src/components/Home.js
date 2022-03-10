import React from "react";
import CategoryFilter from "./CategoryFilter";
import FileUpload from "./FileUpload";
import MemeGrid from "./MemeGrid";

function HomeComponent({ filterContent, setFilterContent }) {
  return (
    <div>
      <div className='max-w-6xl px-4 py-6 mx-auto grid grid-cols-[300px_1fr] gap-8'>
        <CategoryFilter
          filterContent={filterContent}
          setFilterContent={setFilterContent}
        ></CategoryFilter>
        <MemeGrid filterContent={filterContent}></MemeGrid>
      </div>
    </div>
  );
}

export default HomeComponent;
