import React, { useEffect } from "react";
import "./Style/blogcardcontainer.css";
import BlogCard from "./BlogCard";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import { app } from "../FirebaseConfig/firebase.config";
import { UserFunction } from "../Context/UserContext";

const BlogCardContainer = () => {
  const userCtx = UserFunction();

  useEffect(() => {
    fetchBlogs();
  }, [userCtx.dialogAppear]);

  const fetchBlogs = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "blog");
    const snapShot = await get(dbRef);
    if (snapShot.exists()) {
      userCtx.setBlogUploadedArray(Object.values(snapShot.val()));
    } else {
      console.log("Cannot connect to DB");
    }
  };

  return (
    <>
      <div className="blog-card-container">
        {userCtx.blogUploadedArray.map((ele) => (
          <Link
            to={`/post/${ele.id}`}
            state={{
              title: ele.title,
              blogImage: ele.blogImage,
              id: ele.id,
              content: ele.content,
              postDate: ele.postDate,
              profilePic: ele.profilePic,
              userEmai: ele.userEmail,
              type:ele.type
            }}
            key={ele.id}
          >
            <BlogCard
              title={ele.title}
              id={ele.id}
              userEmail={ele.userEmail}
              profilePic={ele.profilePic}
              blogImage={ele.blogImage}
              postDate={ele.postDate}
              type={ele.type}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogCardContainer;
