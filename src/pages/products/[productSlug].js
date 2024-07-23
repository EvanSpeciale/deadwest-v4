import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';

import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Product.module.scss'

export default function Product({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Dead West: ${product.name}`} />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img src={buildImage(product.images[0].public_id).toURL()} />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description?.html }} />
            <p className={styles.productPrice}>
              ${product.price}
            </p>
            <p className={styles.productBuy}>
              <Button className="snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-description={product.description?.text}
                data-item-image={product.images[0].url}
                data-item-name={product.name}>
                Add to Cart
              </Button>
            </p>
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