/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { useTheme } from 'next-themes'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

SwiperCore.use([Autoplay, Navigation, Pagination])

// interface Product {
//   id: string
//   name: string
//   imageUrl: string
//   price: number
// }

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category:string
  };

// const featuredProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Product 1',
//     imageUrl: 'https://picsum.photos/400/400',
//     price: 9.99,
//   },
//   {
//     id: '2',
//     name: 'Product 2',
//     imageUrl: 'https://picsum.photos/400/400',
//     price: 19.99,
//   },
//   {
//     id: '3',
//     name: 'Product 3',
//     imageUrl: 'https://picsum.photos/400/400',
//     price: 14.99,
//   },
// ]

interface Props {
    featuredProducts: Product[];
  }

  const products: Product[] = [
    {
      id: '1',
      title: 'Wireless Bluetooth Headphones',
      description:
        'Experience high-quality sound with these wireless headphones. Connect them to your phone or tablet and enjoy your music without any wires.',
      price: 89.99,
      image: 'https://source.unsplash.com/_9vkyt3sW3Q/400x400',
      category:'clo'
    },
    {
      id: '2',
      title: 'Portable Bluetooth Speaker',
      description:
        'Take your music with you wherever you go with this portable Bluetooth speaker. It delivers powerful sound in a compact size, and has a long-lasting battery.',
      price: 79.99,
      image: 'https://source.unsplash.com/8cnLgUfKdJ0/400x400',
      category:'ele'
    },
    {
      id: '3',
      title: 'Smart Watch',
      description:
        'Stay connected and keep track of your fitness goals with this smart watch. It features a touchscreen display, heart rate monitor, and more.',
      price: 199.99,
      image: 'https://source.unsplash.com/-jr4z4KnU_4/400x400',
      category:'ele'
    },
    {
      id: '4',
      title: 'Wireless Charger',
      description:
        'Charge your phone without any cords with this wireless charger. Simply place your phone on the pad and watch it charge up quickly.',
      price: 29.99,
      image: 'https://source.unsplash.com/8mrYrYFhxco/400x400',
      category:'ele'
    },
    {
      id: '5',
      title: 'Noise Cancelling Headphones',
      description:
        'Block out the world and focus on your music with these noise cancelling headphones. They feature advanced noise cancellation technology for a premium listening experience.',
      price: 149.99,
      image: 'https://source.unsplash.com/3q3sITy0X9M/400x400',
      category:'clo'
    },
    {
      id: '6',
      title: 'Smart Thermostat',
      description:
        'Save energy and stay comfortable with this smart thermostat. It learns your preferences and adjusts the temperature accordingly, and can be controlled from your phone.',
      price: 129.99,
      image: 'https://source.unsplash.com/6fp1hFwJi3Q/400x400',
      category:'ele'
    },
    {
      id: '7',
      title: 'Wireless Gaming Headset',
      description:
        'Get fully immersed in your games with this wireless gaming headset. It delivers high-quality sound and has a comfortable design for long gaming sessions.',
      price: 119.99,
      image: 'https://source.unsplash.com/8DbiDoRN8X0/400x400',
      category:'clo'
    },
    {
      id: '8',
      title: 'Fitness Tracker',
      description:
        'Monitor your activity levels and achieve your fitness goals with this fitness tracker. It tracks your steps, calories burned, and more, and can sync with your phone for detailed analysis.',
      price: 79.99,
      image: 'https://source.unsplash.com/iDhJ1Y2uW8g/400x400',
      category:'ele'
    },
]


const HomePage: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };
  
    const [category, setCategory] = useState('all');
  
    const handleCategoryChange = (category: string) => {
      setCategory(category);
    };
  
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-1 container mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner */}
        <div className="my-8">
          <Swiper
            autoplay={{ delay: 4000 }}
            navigation
            loop
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="relative h-[calc(100vh-80px)]">
                <img
                  src="https://picsum.photos/1920/1080"
                  alt="Banner 1"
                  className="w-full h-full object-cover absolute top-0 left-0 z-[-1]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 flex flex-col justify-center items-center">
                  <h2 className="text-white text-4xl font-bold mb-4">
                    Summer Sale
                  </h2>
                  <p className="text-white text-xl mb-8">
                    Get up to 50% off on all products
                  </p>
                  <button className="bg-white text-black py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-[calc(100vh-80px)]">
                <img
                  src="https://picsum.photos/1920/1080"
                  alt="Banner 2"
                  className="w-full h-full object-cover absolute top-0 left-0 z-[-1]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 flex flex-col justify-center items-center">
                  <h2 className="text-white text-4xl font-bold mb-4">
                    Winter Sale
                  </h2>
                  <p className="text-white text-xl mb-8">
                    Get up to 40% off on all products
                  </p>
                  <button className="bg-white text-black py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        

  
      </main>
     
    </div>
  )
}

export default HomePage
