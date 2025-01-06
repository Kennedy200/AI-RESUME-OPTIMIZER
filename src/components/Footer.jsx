import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-6 mt-12">
<div className="container mx-auto px-4">
  <p className="text-center">
    &copy; {new Date().getFullYear()} CareerBoost AI. All rights reserved.
  </p>
</div>
</footer>
  )
}

export default Footer