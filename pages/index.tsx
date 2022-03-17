import { useState } from 'react';
import Head from 'next/head';
import Table from '../components/table';
import { GetServerSideProps } from 'next';

type Data = {
  name: string;
  place: string;
  animal: string;
  food: string;
  thing: string;
};

type Props = {
  data: {
    data: Data[];
  };
};

const Home: React.FC<Props> = ({ data: { data } }) => {
  const [displayedData, setDisplayedData] = useState<Array<Data>>(data);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value.toLowerCase();

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
};

export default Home;
export const getServerSideProps: GetServerSideProps = async context => {
  let baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://ryffable-israel.herokuapp.com';
  const res = await fetch(`${baseUrl}/api/test`);
  const data = await res.json();

  return {
    props: {
      data
    }
  };
};
