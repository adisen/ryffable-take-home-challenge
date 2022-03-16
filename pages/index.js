import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ryffable</title>
        <meta name='description' content='ryffable' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Hello World</h1>
      </main>
    </div>
  );
}
