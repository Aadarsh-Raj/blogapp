import React from "react";
import { useLocation } from "react-router-dom";
import "./Style/blogpostpage.css";

const BlogPostPage = () => {
  const location = useLocation();
  const {
    title,
    blogImage,
    id,
    content,
    postDate,
    profilePic,
    userEmail,
    type,
  } = location.state || {};
  console.log(content);
  return (
    <>
      <div className="blog-post-page-container">
        <div className="blog-page-image-container">
          <img src={blogImage} alt="" />
        </div>
        <div className="blog-page-content-container">
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
