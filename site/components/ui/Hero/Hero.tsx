import React, { FC } from 'react'
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface HeroProps {
  className?: string
  headline: string
  description: string
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className=" border-b border-t border-accent-2">
      <Container >
        <div className={s.root} style={{ display:'flex', flexDirection:'column', width:'100%', margin:'0 auto', textAlign:'center' }}>
          <h2 className={s.title} style={{margin:'0 auto',display:'block',textAlign:'center'}}>{headline}</h2>
          <div className={s.description} style={{margin:'30px auto 30px',display:'block',textAlign:'center'}}>
            <p>{description}</p>
            <Link
              href="/"
              className="flex items-center justify-center text-accent-0 pt-3 font-bold hover:underline cursor-pointer w-max-content"
            >
              Read it here
              <ArrowRight width="20" heigh="20" className="ml-1" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
