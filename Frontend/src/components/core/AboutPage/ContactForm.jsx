import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

function ContactForm() {
  return (
    <div className='flex flex-col mx-auto items-center justify-center mb-40'>
        <h1 className='text-richblack-5 font-inter font-semibold text-4xl'>
            Get in Touch
        </h1>

        <p className='text-richblack-300 font-medium font-inter text-base mb-10'>We’d love to here for you, Please fill out this form.
        </p>

        <div>
            <ContactUsForm></ContactUsForm>
        </div>
    </div>
  )
}

export default ContactForm