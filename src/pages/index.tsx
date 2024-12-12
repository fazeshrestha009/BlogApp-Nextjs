import React from 'react'
import BlogPosts from './posts/blogs';

const home = () => {
  return (
    <div><div className="text-center p-6">
    <h1 className="text-4xl font-bold mb-4">Welcome to My Blog!</h1>
    <p className="text-lg">A place where I share my thoughts and ideas.</p>
  </div>
  <div className="max-w-4xl mx-auto p-6">
      <BlogPosts/>
    </div>
  </div>
  )
}
export default home;