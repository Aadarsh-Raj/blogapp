import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Style/blogeditor.css";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { app, storage } from "../FirebaseConfig/firebase.config";
import { v4 as uuidv4 } from "uuid";
import { UserFunction } from "../Context/UserContext";
import { func } from "prop-types";

const BlogEditor = () => {
  const userCtx = UserFunction();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  // state management for content in editor
  const handleChange = (content, delta, source, editor) => {
    userCtx.setContentValue(content);
  };

  // state management for title change
  function changeTitle(e) {
    userCtx.setTitle(e.target.value);
  }
  // state management for bgcolor change
  function changeBgColor(e) {
    userCtx.setEditorBackgroundColor(e.target.value);
  }
  // state management for fontcolor change
  function changeFontColor(e) {
    userCtx.setEditorTextColor(e.target.value);
  }
  // formating date in dd-mm-yyyy
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  // state management for type change
  function changeType(e) {
    userCtx.setContentType(e.target.value);
  } // state management for file upload change
  function handleFileChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      userCtx.setDialogMessage("Images Uploaded!");
      userCtx.setDialogAppear(true);
    }
  }
  // function to be called while saving blog on db for saving image url
  function uploadImageOnDb() {
    if (!file) {
      userCtx.setDialogMessage("Please upload a blog image");
      userCtx.setDialogAppear(true);
      return;
    }

    const storageRefDb = storageRef(storage, `images/${file.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRefDb, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload progress" + progress);
      },
      (error) => {
        console.log("Upload fails", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          userCtx.setContentImage(downloadURL);
        });
      }
    );
  }

  const saveBlog = async () => {
    try {
     await uploadImageOnDb(); // Wait for the image upload to complete
      const db = getDatabase(app);
      const postDate = formatDate(Date.now());
      const newDocRef = push(dbRef(db, "blog"));

     if(!userCtx.title || !postDate || !userCtx.userEmail || !userCtx.contentValue || !userCtx.contentType || !userCtx.contentImage){

      userCtx.setDialogMessage("Some datas are missing, Please check once or contact to developer");
      userCtx.setDialogAppear(true);
      return;
     }
      await set(newDocRef, {
        id: uuidv4(),
        title: userCtx.title,
        postDate: postDate,
        userEmail: userCtx.userEmail,
        content: userCtx.contentValue,
        type: userCtx.contentType,
        profilePic: userCtx.profileUrl,
        blogImage: userCtx.contentImage,
      });
      userCtx.setDialogMessage("Blog Posted!");
      userCtx.setDialogAppear(true);
    } catch (error) {
      userCtx.setDialogMessage("Something went Wrong");
      userCtx.setDialogAppear(true);
    }
  };
  return (
    <div
      className="editor-container"
      style={{
        background: userCtx.editorBackgroundColor,
        color: userCtx.editorTextColor,
      }}
    >
      <div className="editor-header">
        <div className="text-input-container">
          <div className="title-container">
            <input
              type="text"
              className="title-input-bar"
              placeholder="Add Title"
              onChange={changeTitle}
              required
            />
          </div>
          <div className="type-container">
            <input
              type="text"
              className="type-input-bar"
              placeholder="Add type"
              onChange={changeType}
              required
            />
          </div>
        </div>
        <div className="color-input-container">
          <div className="editor-background">
            <input
              type="color"
              className="color-input"
              title="Change background color"
              onChange={changeBgColor}
            />
          </div>
          <div className="editor-text">
            <input
              type="color"
              className="color-input"
              title="Change text color"
              onChange={changeFontColor}
            />
          </div>
        </div>
      </div>
      <ReactQuill
        value={userCtx.contentValue}
        onChange={handleChange}
        theme="snow"
        className="custom-editor"
      />
      <div className="image-input-container">
        {file ? "Uploaded" : "Add Image"}
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleFileChange}
          required
        />
      </div>
      <button className="save-blog-btn" onClick={saveBlog}>
        Save
      </button>
    </div>
  );
};

export default BlogEditor;
