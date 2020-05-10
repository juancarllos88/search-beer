import React from 'react';
import './style.css';

function Pagination({handlePrevious,handlerNext, page}) {
  return (
    <div className="buttonSearch">
               <button  type="button" onClick={handlePrevious} disabled={page===1}>Anterior</button>
               <button  type="button" onClick={handlerNext}>Próxima</button>
    </div>
  );
}

export default Pagination;