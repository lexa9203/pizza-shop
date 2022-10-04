import React, { useCallback, useRef, useState } from 'react';
import { setPage } from '../redux/slice/paginateSlice';
import { setSearch } from '../redux/slice/filterSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Input = () => {
  const [value, setValue] = useState('');

  const inputRef = useRef();
  const dispatch = useDispatch();

  const updateSearchValueOnDebounse = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 400),
    [],
  );
  const clearInput = () => {
    dispatch(setSearch(''));
    setValue('');
    inputRef.current.focus();
  };

  const changeSearchValue = (event) => {
    setValue(event.target.value);
    updateSearchValueOnDebounse(event.target.value);
    dispatch(setPage(1));
  };

  return (
    <div className="input_wrap">
      <svg
        className="search"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      <input
        ref={inputRef}
        onChange={(event) => {
          changeSearchValue(event);
        }}
        value={value}
        placeholder="Поиск пиццы..."
        className="input"
        type="text"
      />
      {value && (
        <svg
          onClick={clearInput}
          className="close"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2" />
          <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

export default Input;
