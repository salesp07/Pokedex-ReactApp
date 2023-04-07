import React from "react";
import "./style.css";

function Pagination({ setPage, pageNum, pageList }) {
  return (
    <div className="paginationContainer">
      {pageNum > 1 && (
        <button onClick={() => setPage(pageNum - 1)} className="paginationButton">Prev</button>
      )}
      {pageList.map((item, index) => {
        return (
          <button key={item} onClick={() => setPage(item)} className={item === pageNum ? 'paginationButton buttonActive' : 'paginationButton'}>
            {item}
          </button>
        );
      })}
      {pageNum < Math.max.apply(Math, pageList) && (
        <button onClick={() => setPage(pageNum + 1)} className="paginationButton">Next</button>
      )}
    </div>
  );
}

export default Pagination;
