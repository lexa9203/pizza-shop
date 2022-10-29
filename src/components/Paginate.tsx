import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';

import { setPage } from '../redux/slice/paginateSlice';

const Paginate: React.FC = () => {
  const page = useSelector((state: any) => state.paginate.page);
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      forcePage={page - 1}
      className="paggination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        dispatch(setPage(event.selected + 1));
      }}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Paginate;
