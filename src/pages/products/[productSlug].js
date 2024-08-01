import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '@components/Layout';
import Container from '@components/Container';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export default function Product({ product }) {
  const images = [];
  for (let i = 0; i < product.images.length; i++) {
    images.push(<CldImage key={product.images[i].id} className='inline rounded-lg' src={product.images[i].url} width="750" height="750" crop="auto" alt={product.name} onClick={() => setMainImage(<CldImage className="rounded-lg" src={product.images[i].url} width="750" height="750" crop="auto" alt={product.name} />)} />)
  }
  const [mainImage, setMainImage] = useState(<CldImage className="rounded-lg" src={product.images[0].url} width="750" height="750" crop="auto" alt={product.name} />);
  console.log(product.description.html);
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Dead West: ${product.name}`} />
      </Head>

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className='sm:hidden font-junkie text-desert-green-dark text-5xl text-center mb-6'>{product.name}</div>
          <div className="mx-4 mt-0">
            {mainImage}
            <div className='w-100 grid grid-cols-3 gap-4 mt-4'>
              {images.map(image => {
                return (image);
              })}
            </div>
          </div>
          <div className="mx-4 mt-4 sm:mt-0 bg-desert-green-light bg-opacity-80 rounded-lg">
            <div className='hidden sm:block font-junkie text-desert-green-dark text-3xl md:text-4xl lg:text-5xl text-center my-14'>{product.name}</div>
            <div className="font-playwrite mx-6 mt-8 text-2xl" dangerouslySetInnerHTML={{ __html: product.description?.html }} />
            <div className='flex justify-between mx-6 my-8'>
              <p className="font-playwrite text-2xl content-center">
                ${product.price}
              </p>
              <p className="">
                <button type="button" className="snipcart-add-item font-playwrite text-lg px-4 py-2 text-desert-green-dark hover:text-desert-green-light border-2 border-desert-green-dark bg-desert-green-light hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-md text-center"
                  data-item-id={product.id}
                  data-item-price={product.price}
                  data-item-description={product.description?.text}
                  data-item-image={product.images[0].url}
                  data-item-name={product.name}>
                  Add to Cart
                </button>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clxlea61c02nq06unyx15yc9m/master',
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query PageProduct($slug: String) {
        product(where: {slug: $slug}) {
          id
          name
          description {
            html,
            text
          }
          images
          price
          slug
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    }
  })

  const product = data.data.product;

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clxlea61c02nq06unyx15yc9m/master',
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          name
          description {
            html
          }
          images
          price
          slug
        }
      }
    `
  })
  const paths = data.data.products.map(product => {
    return {
      params: {
        productSlug: product.slug
      }
    }
  })
  return {
    paths: [
      ...paths,
    ],
    fallback: false
  };
}