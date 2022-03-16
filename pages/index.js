import { useState } from 'react';
import Head from 'next/head';
import Table from './components/table';

export default function Home({ data: { data } }) {
  const [displayedData, setDisplayedData] = useState(data);

  const handleChange = event => {
    let value = event.target.value.toLowerCase();

    setDisplayedData(
      data.filter(item => {
        return (
          item.name.toLowerCase().includes(value) ||
          item.place.toLowerCase().includes(value) ||
          item.animal.toLowerCase().includes(value) ||
          item.food.toLowerCase().includes(value) ||
          item.thing.toLowerCase().includes(value)
        );
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Ryffable</title>
        <meta name='description' content='ryffable' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='m-0 p-0'>
        <h1 className='mt-8 text-2xl font-bold text-center'>Ryffable Data</h1>

        <div className='text-center mt-10'>
          <input
            type='text'
            placeholder='Search'
            className='rounded w-1/2 m-auto py-2 px-6'
            onChange={handleChange}
          />
        </div>

        <section className='shadow-2xl w-11/12 m-auto my-8 text-left border border-solid  rounded-md p-8 bg-white'>
          <Table data={displayedData} />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/test');
  const data = await res.json();

  return {
    props: {
      data
    }
  };
}
