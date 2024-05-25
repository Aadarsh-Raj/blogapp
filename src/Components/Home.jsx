import React from "react";
import LandingPage from "./LandingPage";
import BlogCardContainer from "./BlogCardContainer";
import "./Style/home.css"
const Home = () => {
  return (
    <>
      <div className="home-page">
        <LandingPage />

        <h1 className="section-title">Blogs Posted</h1>
        <BlogCardContainer />
       
      </div>
    </>
  );
};

export default Home;
