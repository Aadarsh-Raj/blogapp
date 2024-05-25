import React from "react";
import "./Style/header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserFunction } from "../Context/UserContext";
import { signInWithGoogle, logoutUser } from "../Utils/helper";
const Header = () => {
  const userCtx = UserFunction();
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
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img
            src="https://vizmo.in/blog/content/images/2022/10/Vizmo-V1--8.png"
            alt=""
          />
        </div>
        <nav className="navbar">
          <input type="text" className="search-bar" placeholder="Search" />
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
            <svg width="720" height="720" viewBox="0 0 186.69 190.5">
              <g transform="translate(1184.583 765.171)">
                <path
                  clip-path="none"
                  mask="none"
                  d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                  fill="#4285f4"
                ></path>
                <path
                  clip-path="none"
                  mask="none"
                  d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                  fill="#34a853"
                ></path>
                <path
                  clip-path="none"
                  mask="none"
                  d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                  fill="#fbbc05"
                ></path>
                <path
                  d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                  fill="#ea4335"
                  clip-path="none"
                  mask="none"
                ></path>
              </g>
            </svg>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
