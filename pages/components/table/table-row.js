import React from 'react';

const TableRow = ({ item }) => {
  return (
    <tr className='border-b'>
      <td className='pt-5 pb-6'>{item.name}</td>
      <td className='pt-5 pb-6'>{item.place}</td>
      <td className='pt-5 pb-6 capitalize'>{item.animal}</td>
      <td className='pt-5 pb-6 capitalize'>{item.food}</td>
      <td className='pt-5 pb-6 capitalize'>{item.thing}</td>
    </tr>
  );
};

export default TableRow;
