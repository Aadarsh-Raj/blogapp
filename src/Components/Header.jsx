import React, { useState } from "react";
import "./Style/header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserFunction } from "../Context/UserContext";
import { signInWithGoogle, logoutUser } from "../Utils/helper";
const Header = () => {
  const userCtx = UserFunction();
  const [navList, setNavList] = useState([]);
  const navigate = useNavigate();

  async function loginWithGoogleBtn() {
    try {
      const response = await signInWithGoogle();
      await userCtx.setUser(response.user);
      await userCtx.setDialogMessage("You are logged in");
      await userCtx.setDialogAppear(true);
      navigate("/");
    } catch (error) {
      userCtx.setDialogMessage("Something went wrong");
      userCtx.setDialogAppear(true);
      console.log(error);
    }
  }
  async function logoutUserBtn() {
    try {
      await logoutUser();
      await userCtx.setDialogMessage("You are logged out");
      await userCtx.setDialogAppear(true);
      navigate("/");
    } catch (error) {
      userCtx.setDialogMessage("Something went wrong");
      userCtx.setDialogAppear(true);
      console.log(error);
    }
  }
  function searchBlog(e) {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const result = userCtx.blogUploadedArray.filter(
        (ele) =>
          ele.title.toLowerCase().includes(value) ||
          ele.type.toLowerCase().includes(value)
      );
      setNavList(result);
    } else {
      setNavList([]);
    }
  }
  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="logo-container">
            <img
              src="https://vizmo.in/blog/content/images/2022/10/Vizmo-V1--8.png"
              alt=""
            />
          </div>
        </Link>

        <div className="header-right">
        <nav class="navbar">
          <input checked="" class="checkbox" type="checkbox" />
          <div class="mainbox">
            <div class="iconContainer">
              <svg
                viewBox="0 0 512 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                class="search_icon"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
              </svg>
            </div>
            <input
              class="search_input"
              placeholder="search"
              type="text"
              onChange={searchBlog}
            />
          </div>
          {navList.length > 0 && (
            <ul className="search-list">
              {navList.map((ele) => (
                <>
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
                      type: ele.type,
                    }}
                    key={ele.id}
                  >
                    <li onClick={() => setNavList([])}>{ele.title}</li>
                  </Link>
                </>
              ))}
            </ul>
          )}
        </nav>

        {userCtx.user ? (
          <div className="more-options">
            More
            <ul className="more-options-lists">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={userCtx.user ? "/post" : "/"}>
                <li>Create Blog</li>
              </Link>
              <li className="logout" onClick={logoutUserBtn}>
                Log Out
              </li>
            </ul>
          </div>
        ) : (
          <button className="signin" onClick={loginWithGoogleBtn}>
            <svg
              viewBox="0 0 256 262"
              preserveAspectRatio="xMidYMid"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              ></path>
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              ></path>
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              ></path>
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              ></path>
            </svg>
            Sign in with Google
          </button>
        )}
        </div>
      </header>
    </>
  );
};

export default Header;
