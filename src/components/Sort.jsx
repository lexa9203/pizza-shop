import React, { useState } from 'react';

const Sort = () => {
  const [showSort, setShowSort] = useState(false);
  const [sortIndex, setSortIndex] = useState(0);

  const sort = ['популярности', 'цене', 'алфавиту'];

  const selectSort = (index) => {
    setSortIndex(index);
    setShowSort(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setShowSort(!showSort);
          }}>
          {sort[sortIndex]}
        </span>
      </div>
      {showSort && (
        <div className="sort__popup">
          <ul>
            {sort.map((el, index) => (
              <li
                className={sortIndex === index ? 'active' : ''}
                onClick={() => {
                  selectSort(index);
                }}
                key={index}>
                {el}
              </li>
            ))}

            {/* <li className="active">популярности</li>
            <li>цене</li>
            <li>алфавиту</li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
