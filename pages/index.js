import Head from 'next/head';
import Image from 'next/image';
import Table from './components/table';

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Ryffable</title>
        <meta name='description' content='ryffable' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='m-0 p-0'>
        <h1 className='mt-8 text-2xl font-bold text-center'>Ryffable Data</h1>

        <section className='shadow-2xl w-11/12 m-auto my-8 text-left border border-solid  rounded-md p-8 bg-white'>
          <Table data={data} />
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
