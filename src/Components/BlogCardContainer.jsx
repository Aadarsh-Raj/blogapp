import React from "react";
import "./Style/blogcardcontainer.css";
import BlogCard from "./BlogCard";


const BlogCardContainer = () => {
 
  return (
    <>
      <div className="blog-card-container">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </>
  );
};

export default BlogCardContainer;
