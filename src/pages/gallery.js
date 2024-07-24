import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';

import Layout from '@components/Layout';

import Link from 'next/link';

export default function Shop({ products }) {
    return (
        <Layout>
            <Head>
                <title>Gallery</title>
                <meta name="description" content="Gallery" />
            </Head>
            <div className='w-full'>

                <h2 className='font-junkie text-desert-green-dark text-5xl mb-8 mx-auto text-center px-2'>GALLERY</h2>

                <div className='mx-6'>
                    <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {products.map(product => {
                            const imgURL = buildImage(product.images[0].public_id).toURL();
                            return (
                                <div key={product.name} className="max-w-sm mx-4 justify-self-center mb-10 bg-desert-green-light  rounded-lg shadow-lg">
                                    <img className=" rounded-t-lg" src={imgURL} alt="product image" />
                                    <div className="px-2 pb-2">
                                        <h5 className="text-xl font-playwrite tracking-tight text-desert-green-dark mt-3 mb-2">{product.name}</h5>
                                    </div>
                                </div>
                            )
                        })}
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
        query PageShop {
          page(where: {slug: "shop"}) {
            id
            name
            slug
          }
          products(where: {forSale: false}) {
            id
            name
            images
            price
            slug
          }
        }
      `
    })

    let home = data.data.page;
    const products = data.data.products;
    return {
        props: {
            home,
            products
        }
    }
}