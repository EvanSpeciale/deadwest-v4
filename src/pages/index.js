import Head from 'next/head'
import Link from 'next/link';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Page.module.scss'
import Script from 'next/script';

export default function Home({ home, products }) {
  const { heroTitle, heroText, heroLink, heroBackground } = home;
  return (
    <Layout>
      <Head>
        <title>Dead West</title>
        <meta name="description" content="Handmade goods" />
      </Head>
      <Container>
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
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {

  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clxlea61c02nq06unyx15yc9m/master',
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query PageHome($locale: Locale!){
        page(where: {slug: "home"}) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
          localizations(locales: [$locale]) {
            heroText
            heroTitle
            locale
          }
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
    variables: {
      locale
    }
  })

  let home = data.data.page;
  if (home.localizations.length > 0) {
    home = { ...home, ...home.localizations[0] }
  }
  const products = data.data.products;
  return {
    props: {
      home,
      products
    }
  }
}