import React from 'react'

type Props = {}

function FeatureSection({}: Props) {
  return (
    <div className='my-7 max-w-7xl mx-auto'>
      <div>
        <h2 className="text-5xl tracking-wider font-semibold text-accent-7 text-center my-4">
          Why Choose Us
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="bg-accent-1 rounded-lg m-3 px-4 py-8 border border-[#351E22]">
          <h4 className="font-light text-4xl text-[#E97F0A] tracking-widest">
            Feature Title
          </h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi.</p>
        </div>
        <div className="bg-accent-1 rounded-lg m-3 px-4 py-8 border border-[#351E22]">
          <h4 className="font-light text-4xl text-[#E97F0A] tracking-widest">
            Feature Title
          </h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi.</p>
        </div>
        <div className="bg-accent-1 rounded-lg m-3 px-4 py-8 border border-[#351E22]">
          <h4 className="font-light text-4xl text-[#E97F0A] tracking-widest">
            Feature Title
          </h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi.</p>
        </div>
        
      </div>
    </div>
  )
}

export default FeatureSection
