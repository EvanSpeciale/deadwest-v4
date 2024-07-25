import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '@components/Layout';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';

export default function Shop({ products }) {
    return (
        <Layout>
            <Head>
                <title>Shop</title>
                <meta name="description" content="Shop" />
            </Head>
            <div className='w-full'>

                <div className='font-junkie text-desert-green-dark text-6xl w-fit mx-auto mb-6'>
                    <Link href="/gallery">
                        SHOP
                    </Link>
                </div>

                <div className='mx-6'>
                    <div className='mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                        {products.map(product => {
                            return (
                                <div key={product.name} className="max-w-sm mx-4 justify-self-center mb-10 bg-desert-green-light  rounded-lg shadow-lg">
                                    <Link className="rounded-lg" href={'/products/' + product.slug}>
                                        <div>
                                            <CldImage className="rounded-t-lg" src={product.images[0].url} width="500" height="500" crop="auto" alt={product.name} />
                                            {/* <img
                                                className="rounded-t-lg"
                                                src={imgURL}
                                                alt="product image"
                                            /> */}
                                        </div>
                                    </Link>
                                    <div className="px-2 pb-2">
                                        <Link href={'/products/' + product.slug}>
                                            <h5 className="font-playwrite text-xl font-semibold tracking-tight text-desert-green-dark pt-2">{product.name}</h5>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <span className="font-sans text-desert-green-dark">${product.price}</span>
                                            <button className="font-sans snipcart-add-item px-2 py-1 text-desert-green-dark hover:text-desert-green-light border-2 border-desert-green-dark hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-full text-md text-center"
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
                            )
                        })}
                    </div>
                    <div className='w-fit mx-auto'>
                        <Link href="/gallery">
                            <button type="button" className="font-playwrite text-sm p-2 text-desert-green-dark hover:text-desert-green-light border-2 border-desert-green-dark bg-desert-green-light hover:bg-desert-green-dark focus:ring-4 focus:outline-none focus:ring-desert-green-light rounded-md text-center"><FaArrowLeft className='inline mb-1' />Mosey on back to the gallery</button>
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
        query PageShop {
          page(where: {slug: "shop"}) {
            id
            name
            slug
          }
          products(where: {forSale: true}) {
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