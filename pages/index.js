import Image from 'next/image';
import HomeLayout from '@/Components/HomeLayout';
import Nav from '@/Components/nav';
import Footer from '@/Components/footer';
import Context from "@/context/context";
import Head from 'next/head';



export default function Home() {
  return (
   
    <Context>
     <Head>
         <title>Top 250 Movies in IMDB</title>
     </Head>
     <Nav />
     <main
      className={`flex min-h-screen flex-col items-center justify-between`}
      >
      <HomeLayout />
    </main>
    <Footer />
    </Context>
  )
}
