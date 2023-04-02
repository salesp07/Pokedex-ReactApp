import React from "react";
import './styles.css'

function Pagination({ setPage, pageNum, pageList }) {
  return (
    <div className="paginationContainer">
      {pageNum > 1 && (
        <button onClick={() => setPage(pageNum - 1)}>Prev</button>
      )}
      {pageList.map((item, index) => {
        return (
          <button key={item} onClick={() => setPage(item)} className={item === pageNum ? 'buttonActive' : undefined}>
            {item}
          </button>
        );
      })}
      {pageNum < Math.max.apply(Math, pageList) && (
        <button onClick={() => setPage(pageNum + 1)}>Next</button>
      )}
    </div>
  );
}

export default Pagination;
