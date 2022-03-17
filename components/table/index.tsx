import React, { useState, useEffect } from 'react';
import TableRow from './table-row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export type Data = Array<{
  name: string;
  place: string;
  animal: string;
  food: string;
  thing: string;
}>;

type Props = {
  data: Data[];
};

const Table: React.FC<Props> = props => {
  const [aData, setAData] = useState<Array<Data>>([]);
  const [numOfPages, setNumOfPages] = useState<number>(null);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedData, setDisplayedData] = useState<Array<Data>>([]);

  useEffect(() => {
    setAData(prevState => {
      const data: Data[] = props.data;
      setNumOfPages(data.length / perPage);
      setDisplayedData(data.slice(0, currentPage * perPage));
      return data;
    });
  }, [props]);

  const handlePerPageChange = event => {
    setPerPage(prevState => {
      let value = event.target.value;
      setNumOfPages(aData.length / value);
      setDisplayedData(
        aData.slice(currentPage * perPage - perPage, currentPage * value)
      );
      return value;
    });
  };

  const handleNextPage = () => {
    if (aData.length > currentPage * perPage) {
      setCurrentPage(prevState => {
        let nextState = prevState + 1;
        setDisplayedData(
          aData.slice(nextState * perPage - perPage, nextState * perPage)
        );
        return nextState;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => {
        let nextState = prevState - 1;
        setDisplayedData(
          aData.slice(nextState * perPage - perPage, nextState * perPage)
        );
        return nextState;
      });
    }
  };

  return (
    <div className='w-11/12 m-auto'>
      <table className='w-full'>
        <thead className='uppercase text-sm'>
          <tr>
            <th className='mb-9'>Name</th>
            <th className='mb-9'>Place</th>
            <th className='mb-9'>Animal</th>
            <th className='mb-9'>Food</th>
            <th className='mb-9'>Things</th>
          </tr>
        </thead>
        <tbody className='text-md'>
          {displayedData.map(item => {
            return <TableRow item={item} key={item._id} />;
          })}
        </tbody>
      </table>
      <div className='flex w-full justify-between mt-10'>
        <div className='flex items-center gap-5 text-[rgba($color: #545f7d, $alpha: 0.6)]'>
          <p>Showing</p>
          <select
            className='w-20 h-9 rounded px-3'
            name='items'
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value='100'>100</option>
            <option value='50'>50</option>
            <option value='20'>20</option>
            <option value='10'>10</option>
          </select>
          <p>out of 100</p>
        </div>
        <div className='flex items-center gap-5 '>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='w-20 h-9 py-2 px-3 rounded cursor-pointer bg-gray-100'
            onClick={handlePreviousPage}
          />
          <div>
            <span className='cursor-pointer px-2'>{currentPage}</span>
            <span className='cursor-pointer px-2'>
              {currentPage + 1 < numOfPages ? currentPage + 1 : ''}
            </span>
            <span className='cursor-pointer px-2'>
              {currentPage + 2 < numOfPages ? currentPage + 2 : ''}
            </span>
            <span className='cursor-pointer px-2'>...</span>
            <span className='cursor-pointer px-2'>{numOfPages - 1}</span>
            <span className='cursor-pointer px-2'>{numOfPages}</span>
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            className='w-20 h-9 py-2 px-3 rounded cursor-pointer bg-gray-100'
            onClick={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
