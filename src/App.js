import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import { UserFunction } from "./Context/UserContext";
import Header from "./Components/Header";
import BlogEditor from "./Components/BlogEditor";
import DialogueBox from "./Components/DialogueBox";
function App() {
  const userCtx = UserFunction();
  function handleCloseDialog() {
    userCtx.setDialogAppear(false);
  }
  return (
    <>
      <main className="main">
        <DialogueBox onClose={handleCloseDialog} duration={3000}/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={ "/post"} element={userCtx.user ?<BlogEditor />: <Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
