import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Info from "./pages/Info";
import Todos from "./pages/Todos";
import Alboms from "./pages/Alboms";
import Posts from "./pages/Posts";
import Photos from "./pages/Photos";
import SinglePost from "./pages/SinglePost";
import Comments from "./pages/Comments";



function App() {
  const [allInfo, setAllInfo] = useState({})

  useEffect(() => {
    ['users' ,'todos' ,'albums' ,'posts' ].forEach((e, i) => {
        fetch(`https://jsonplaceholder.typicode.com/${e}`)
          .then(res => res.json())
          .then(data => allInfo[e] = data)
    })
    setAllInfo(allInfo)
  }, [])

  return (
    <React.Fragment>
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Login data={allInfo}/>}/>
          <Route path="/login" element={<Login data={allInfo}/>} />
          <Route path="/main" element={<Main data={allInfo}/>} >
            <Route index element={<Info />}/>
            <Route path="info" element={<Info data={allInfo}/>}/>
            <Route path="todos" element={<Todos data={allInfo}/>}/>
            <Route path="albums" element={<Alboms data={allInfo}/>}/>
            <Route path="albums/:albumId/photos" element={<Photos />} />
            <Route path="posts" element={<Posts data={allInfo}/>}/>
            <Route path="posts/:postId" element={<SinglePost />}>
              <Route path="comments" element={<Comments />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
