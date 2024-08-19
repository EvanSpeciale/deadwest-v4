import Head from 'next/head'
import Link from 'next/link';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '@components/Layout';
import Image from 'next/image';
import deadWestLogo from '../../public/images/dead-west-logo.svg'

export default function Home({ home, products }) {
  return (
    <Layout className="test">
      <Head>
        <title>Dead West</title>
        <meta name="description" content="Handmade goods" />
      </Head>
      <div className='relative isolate px-6 lg:px-8 w-100'>
        <div className=''>
          <Image src={deadWestLogo} alt='dead west logo' height={400} width={400} className='mx-auto'></Image>
        </div>
        <div className="mx-auto max-w-6xl min-w-40">
          <div className="grid gap-x-12 gap-y-8 grid-cols-1 sm:grid-cols-2 mx-10">
            <Link href="/gallery" className='w-full'>
              <button type="button" className="font-junkie flex-initial w-full py-4 text-desert-green-light  hover:text-desert-green-light border-4 border-desert-green-dark bg-desert-green-dark hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-4xl text-center">Gallery</button>
            </Link>
            <Link href="/shop" className='w-full'>
              <button type="button" className="font-junkie flex-initial w-full py-4 text-desert-green-light  hover:text-desert-green-light border-4 border-desert-green-dark bg-desert-green-dark  hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-4xl text-center">Shop</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clxlea61c02nq06unyx15yc9m/master',
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query PageHome{
        page(where: {slug: "home"}) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
        }
        products(where: {categories_some:{ slug: "featured"}}) {
          id
          name
          images
          price
          slug
        }
      }
    `,
  })

  const home = data.data.page;

  const products = data.data.products;
  return {
    props: {
      home,
      products
    }
  }
}