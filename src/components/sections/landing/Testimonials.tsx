import ProfileAvatar from '@/components/custom-ui/ProfileAvater';
import { testimonial } from '@/lib/constants';
import React from 'react'

const Testimonials = () => {
  return (
    <section className="p-5 py-[50px] md:p-[64px] space-y-[38px] md:space-y-[64px]">
      <h1 className="section_title max-md:text-[30px] sm:text-center leading-relaxed">
        What we Offer
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonial.map((testimony, idx) => (
          <div key={idx} className="p-4 rounded-[12px] border border-[rgba(33,33,33,0.60)] space-y-3 shadow-md">
            <div className="flex gap-3 items-center">
              <ProfileAvatar
                image={testimony.authorImage}
                name={testimony.author}
              />
              <h1 className="text-[18px] font-semibold leading-[28px] capitalize">
                {testimony.author}
              </h1>
            </div>
            <p className="text-[18px]">
              {testimony.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials