import { ProductCard } from '@components/product'
import React,{FC} from 'react'
interface ProductsProps {
    products?: any
  }

  const CardFeatures: FC<ProductsProps> = ({ products }) => {
  return (
    <div className='flex'>
      <div className='w-[50%] h-10 bg-[red] flex-grow'>
      <ProductCard product={products[2]} variant="slim" />
      </div>
      <div className='w-[50%] h-10 bg-[blue] flex-grow'>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default CardFeatures
