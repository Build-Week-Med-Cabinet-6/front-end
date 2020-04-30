import React from 'react';
import StrainsCard from './StrainsCard';

function StrainsList({ strainsArray }) {
  return(
    <div
      style={{ width: "90%", maxWidth: "550px", margin: "10% auto" }}
    >
      {strainsArray.map((strain, index) => {
          return (
            <StrainsCard key={index} strain={strain}/>
          );
        })}
    </div>
  );
}

export default StrainsList;