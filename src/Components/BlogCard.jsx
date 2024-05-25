import React from "react";
import "./Style/blogcard.css";
const BlogCard = (props) => {
  console.log(props);
  return (
    <>
      <div className="card-item">
        <div className="image-container">
          <img src={props.blogImage} alt="Blog Image" />
        </div>
        <div className="content-container">
          <div className="blog-type-container">{props.type}</div>
          <div className="blog-details-container">
            <h2>{props.title}</h2>
          </div>
          <div className="user-details-container">
            <div className="user-email-box">
              <div className="user-image">
                <img src={props.profilePic ? props.profilePic : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"} alt="Photo" />
              </div>
              <div className="user-email">{props.userEmail}</div>
            </div>
            <div className="blog-date-box" title="Posted On">{props.postDate}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
