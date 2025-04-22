'use client';

import Pagination from 'react-js-pagination';

type CommonPaginationProps = {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
  onChange: (pageNumber: number) => void;
};

const CommonPagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}: CommonPaginationProps) => {
  return (
    totalItemsCount > 0 && (
      <div className='mt-12 mb-10 mobile:max-w-[100px] mobile:mx-auto'>
        <div className='customPagination'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onChange}
          />
        </div>
      </div>
    )
  );
};

export default CommonPagination;
