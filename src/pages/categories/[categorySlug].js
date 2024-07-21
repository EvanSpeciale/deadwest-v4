import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';

import Layout from '@components/Layout';
// import Button from '@components/Button';

import styles from '@styles/Page.module.scss'
import Link from 'next/link';



export default function Category({ category, products }) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>

      <div className='w-full'>

        <h2 className='font-junkie-cowboy text-desert-green-dark text-5xl mb-8 mx-auto text-center px-2'>Products</h2>

        <div className='w-fit grid sm:grid-cols-2 md:grid-cols-3 mx-auto sm:mx-6'>
          {products.map(product => {
            const imgURL = buildImage(product.images[0].public_id).toURL();
            return (
              <div key={product.name} className="max-w-sm mx-2 mb-4 bg-desert-green-light  rounded-lg shadow-lg">
                <Link className="rounded-lg" href={'/products/' + product.slug}>
                  <img className=" rounded-t-lg" src={imgURL} alt="product image" />
                </Link>
                <div className="px-2 pb-2">
                  <Link href={'/products/' + product.slug}>
                    <h5 className="text-xl font-semibold tracking-tight text-desert-green-dark">{product.name}</h5>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-desert-green-dark">${product.price}</span>
                    <button className="snipcart-add-item px-2 py-1 text-desert-green-dark hover:text-desert-green-light border-2 border-desert-green-dark hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-md text-center"
                      data-item-id={product.id}
                      data-item-price={product.price}
                      data-item-description={product.description?.text}
                      data-item-image={product.images[0].url}
                      data-item-name={product.name}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              // <li key={product.slug}>
              //   <Link href={"/products/" + product.slug}>
              //     <a>
              //       <div className={styles.productImage}>
              //         <img src={imgURL} />
              //       </div>
              //       <h3 className={styles.productTitle}>
              //         {product.name}
              //       </h3>
              //       <p className={styles.productPrice}>
              //         ${product.price}
              //       </p>
              //     </a>
              //   </Link>

              //   <p>
              //     <Button className="snipcart-add-item"
              //       data-item-id={product.id}
              //       data-item-price={product.price}
              //       data-item-description={product.description?.text}
              //       data-item-image={product.images[0].url}
              //       data-item-name={product.name}>
              //       Add to Cart
              //     </Button>
              //   </p>
              // </li>
            )
          })}
        </div>
      </div>
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
      query PageCategory($slug: String) {
        category(where: {slug: $slug}) {
          id
          name
          products {
            id
            name
            price
            images
            slug
          }
        }
      }
    `,
    variables: {
      slug: params.categorySlug
    }
  })

  const category = data.data.category;

  return {
    props: {
      category,
      products: category.products,
    }
  }
}

export async function getStaticPaths({ locales }) {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clxlea61c02nq06unyx15yc9m/master',
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query PageCategories {
        categories {
          id
          slug
        }
      }
    `
  })
  const paths = data.data.categories.map(category => {
    return {
      params: {
        categorySlug: category.slug
      }
    }
  })
  return {
    paths: [
      ...paths,
      ...paths.flatMap(path => {
        return locales.map(locale => {
          return {
            ...path,
            locale
          }
        })
      })
    ],
    fallback: false
  };
}