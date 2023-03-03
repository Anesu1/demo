/* eslint-disable @next/next/no-img-element */
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import { useState, useEffect } from 'react'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import Link from 'next/link'
import CardFeatures from '@components/ui/CardFeatures/CardFeatures'

SwiperCore.use([Autoplay, Navigation, Pagination])

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
    <Container>
      <Swiper
            autoplay={{ delay: 4000 }}
            navigation
            loop
            pagination={{ clickable: true }}
          >
            {products.map((product: any, i: number) => (
          // product={product} variant="slim" />
          <SwiperSlide key={product.id}>
              <div className="relative h-[calc(100vh-80px)] mb-10">
                <img
                  src={product.images[2].url}
                  alt={product.name}
                  className="w-full h-full object-cover absolute top-0 left-0 z-[-1]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 flex flex-col justify-center items-center">
                  <h2 className="text-white text-2xl font-bold mb-4">
                   {product.name}
                  </h2>
                  <p className="text-white text-xl mb-8">
                   Only {product.price.value} {product.price.currencyCode}
                  </p>
                  <Link href={`/product/${product.slug}`} className="bg-white text-black py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
        ))}
          </Swiper>
    </Container>
     
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      {/* <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      {/* <CardFeatures products={products}/> */}
      {/* <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 1 ? 1080 : 540,
              height: i === 1 ? 1080 : 540,
            }}
          />
        ))}
      </Grid> */}
      {/* <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
      
    </>
  )
}

Home.Layout = Layout
