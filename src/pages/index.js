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
        {/* <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div> */}
        <div className=''>
          <Image src={deadWestLogo} alt='dead west logo' height={400} width={400} className='mx-auto'></Image>
        </div>
        <div className="mx-auto max-w-6xl min-w-40">
          <div className="flex flex-wrap sm:mb-8 justify-center">
            <Link href="/gallery">
              <button type="button" className="font-junkie flex-initial w-96 m-w-60 py-4 my-4 mx-4 text-desert-green-light min-[880px]:text-desert-green-dark hover:text-desert-green-light border-4 border-desert-green-dark bg-desert-green-dark min-[880px]:bg-transparent hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-4xl text-center">Gallery</button>
            </Link>
            <Link href="/shop">
              <button type="button" className="font-junkie flex-initial w-96 m-w-60 col-auto py-4 my-4 mx-4 text-desert-green-light min-[880px]:text-desert-green-dark hover:text-desert-green-light border-4 border-desert-green-dark bg-desert-green-dark min-[880px]:bg-transparent hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-4xl text-center">Shop</button>
            </Link>
          </div>
        </div>
      </div>
      {/* <Container className="test">
        <h1 className="sr-only">Dead West</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height} src={buildImage(heroBackground.public_id).toURL()} alt="" />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map(product => {
            const imgURL = buildImage(product.images[0].public_id).toURL();

            return (
              <li key={product.slug}>
                <Link href={"/products/" + product.slug}>
                  <a>
                    <div className={styles.productImage}>
                      <img width={product.images[0].width} height={product.images[0].height} src={imgURL} alt="" />
                    </div>
                    <h3 className={styles.productTitle}>
                      {product.name}
                    </h3>
                    <p className={styles.productPrice}>
                      ${product.price}
                    </p>
                  </a>
                </Link>
                <p>
                  <Button className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-description={product.description?.text}
                    data-item-image={product.images[0].url}
                    data-item-name={product.name}>
                    Add to Cart
                  </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container> */}
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