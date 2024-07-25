import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';

import Layout from '@components/Layout';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';

export default function Shop({ products }) {
    return (
        <Layout>
            <Head>
                <title>Gallery</title>
                <meta name="description" content="Gallery" />
            </Head>
            <div className='w-full'>

                <div className='font-junkie text-desert-green-dark text-6xl w-fit mx-auto mb-6'>
                    <Link href="/shop">
                        GALLERY
                    </Link>
                </div>

                <div className='mx-6'>
                    <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {products.map(product => {
                            const imgURL = buildImage(product.images[0].public_id).toURL();
                            return (
                                <div key={product.name} className="max-w-sm mx-4 justify-self-center mb-10 bg-desert-green-light  rounded-lg shadow-lg">
                                    <CldImage className="rounded-t-lg" src={product.images[0].url} width="500" height="500" crop="auto" alt={product.name} />
                                    {/* <img className=" rounded-t-lg" src={imgURL} alt="product image" /> */}
                                    <div className="px-2 pb-2">
                                        <h5 className="text-xl font-playwrite tracking-tight text-desert-green-dark mt-3 mb-2">{product.name}</h5>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='w-fit mx-auto'>
                    <Link href="/shop">
                        <button type="button" className="font-playwrite text-sm p-2 text-desert-green-dark hover:text-desert-green-light border-2 border-desert-green-dark bg-desert-green-light hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-md text-center">Mosey on down to the shop <FaArrowRight className='inline mb-1' /></button>
                    </Link>
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