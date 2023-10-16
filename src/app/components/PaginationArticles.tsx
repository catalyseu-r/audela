import React from 'react';
import { useGlobalContext } from '../contexts/store';
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrorwRight } from 'react-icons/bs';

const PaginationArticles = () => {
  const { pagination, maxPages, articlesPerPage, setPagination } = useGlobalContext();

  const [windowWidth, setWindowWidth] = React.useState<number | undefined>(
    window !== undefined ? window.innerWidth : undefined
  );

  const buttonArray = Array.from(
    Array(
      pagination.totalItems >= maxPages * articlesPerPage
        ? maxPages
        : Math.ceil(pagination.totalItems / articlesPerPage)
    ).keys()
  );

  const handleResize = () => setWindowWidth(window.innerWidth);

  React.useEffect(() => {
    window && window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isForwrard = (current: number, button: 'forward' | 'back') => {
    if (button === 'forward' && current < buttonArray.length) {
      setPagination({ totalItems: pagination.totalItems, currentPage: pagination.currentPage + 1 });
    } else if (button === 'back' && current !== 1) {
      setPagination({ totalItems: pagination.totalItems, currentPage: pagination.currentPage - 1 });
    }
  };

  return (
    <div className='flex items-center justify-center gap-4 w-full mt-16'>
      <button
        onClick={() => isForwrard(pagination.currentPage, 'back')}
        className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
          pagination.currentPage === 1 ? `cursor-not-allowed` : `cursor-pointer`
        } ${pagination.currentPage === 1 ? `border-deep-green/50` : `border-interactive-green`}`}
        disabled={pagination.currentPage === 1}
      >
        <ArrowLeft className='text-lg text-text-white' />
      </button>
      {windowWidth && windowWidth > 768 ? (
        buttonArray.map((item, index) => {
          const appendIndex = index + 1;
          return (
            <button
              key={appendIndex}
              className={`text-lg transition-all ${
                appendIndex === pagination.currentPage ? `text-interactive-green scale-150` : `text-text-white`
              }`}
              onClick={(event) =>
                setPagination({ totalItems: pagination.totalItems, currentPage: Number(event.currentTarget.value) })
              }
              value={appendIndex}
            >
              {appendIndex}
            </button>
          );
        })
      ) : (
        <select
          value={pagination.currentPage}
          onChange={(event) =>
            setPagination({ totalItems: pagination.totalItems, currentPage: Number(event.currentTarget.value) })
          }
          className=' px-4 h-9 rounded bg-bg-black border outline-none focus:border-interactive-green transition-all border-deep-green text-base text-text-white  !font-sans cursor-pointer'
        >
          {buttonArray.map((item, index) => {
            const appendIndex = index + 1;
            return (
              <option
                className={`${pagination.currentPage === appendIndex && `text-main-orange-accen`}`}
                key={appendIndex}
                value={appendIndex}
              >
                {appendIndex}
              </option>
            );
          })}
        </select>
      )}
      <button
        onClick={() => isForwrard(pagination.currentPage, 'forward')}
        className={`lg:w-6 lg:h-6 w-9 h-9 flex items-center justify-center border p-1 rounded ${
          pagination.currentPage === buttonArray.length ? `cursor-not-allowed` : `cursor-pointer`
        } ${
          pagination.currentPage === buttonArray.length ? `border-interactive-green/50` : `border-interactive-green`
        }`}
        disabled={pagination.currentPage === buttonArray.length}
      >
        <ArrorwRight className='text-lg text-text-white' />
      </button>
    </div>
  );
};

export default PaginationArticles;
