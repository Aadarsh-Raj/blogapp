import React from "react";
import "./Style/blogcard.css"
const BlogCard = () => {
  
  return (
    <>
      <div className="card-item">
        <div className="image-container">
          <img src="https://st2.depositphotos.com/1006899/8421/i/950/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg" alt="Blog Image" />
        </div>
        <div className="content-container">
         <div className="blog-type-container">
          Tech
         </div>
          <div className="blog-details-container">
            <h1>My Title</h1>
          </div>
          <div className="user-details-container">
            <div className="user-email-box">
              <div className="user-image">
                <img src="" alt="Photo" />
              </div>
              <div className="user-email">aadarshraj06062001@gmail.com</div>
            </div>
            <div className="blog-date-box">29 o4 2024</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
