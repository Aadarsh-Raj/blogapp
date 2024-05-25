import { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../FirebaseConfig/firebase.config";
const UserContextController = createContext({});

export const UserFunction = () => {
  return useContext(UserContextController);
};
const UserContext = ({ children }) => {
  const [user, setUser] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const [userEmail, setUserEmail] = useState("Anonymous");
  const [profileUrl, setProfileUrl] = useState(
    "https://t3.ftcdn.net/jpg/02/09/95/42/360_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.webp"
  );
  const [title, setTitle] = useState("");
  const [editorBackgroundColor, setEditorBackgroundColor] = useState("white");
  const [editorTextColor, setEditorTextColor] = useState("black");
  const [contentValue, setContentValue] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [dialogAppear, setDialogAppear] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "Welcome to Vizmo Blog Poster"
  );
  const [progress, setProgress] = useState(0);
  const [blogUploadedArray, setBlogUploadedArray] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setDisplayName(user.displayName);
        user.photoURL && setProfileUrl(user.photoURL);
        setUserEmail(user.email);
      } else {
        console.log(user, "logged Out");
        setUser(false);
      }
    });
  }, [UserFunction]);

  const functionObject = {
    user,
    setUser,
    userEmail,
    setUserEmail,
    profileUrl,
    setProfileUrl,
    displayName,
    setDisplayName,
    title,
    setTitle,
    editorBackgroundColor,
    setEditorBackgroundColor,
    editorTextColor,
    setEditorTextColor,
    contentValue,
    setContentValue,
    contentType,
    setContentType,
    contentImage,
    setContentImage,
    dialogAppear,
    setDialogAppear,
    dialogMessage,
    setDialogMessage,
    progress,
    setProgress,
    blogUploadedArray,
    setBlogUploadedArray,
  };

  return (
    <UserContextController.Provider value={functionObject}>
      {children}
    </UserContextController.Provider>
  );
};

export { UserContext };
