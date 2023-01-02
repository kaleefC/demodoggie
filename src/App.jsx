import { useState, React } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom"

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete'
import "./App.css";
import "./Header.css";
import Logout from "./Logout";

function App() {

  const [search, setSearch] = useState('');
  const useNav = useNavigate();

  const handleSubmit = (ev) => {

    ev.preventDefault();

    if (search.length > 0) {

      sessionStorage.setItem('search', search);

      console.log(JSON.stringify(sessionStorage, null, 2));

      useNav('/');
    } else {

      alert('The search is invalid.')

    }
  };

  return (
    <>
    {/* Identifies the pages to be used */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/edit' element={<Edit />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/delete' element={<Delete />}></Route>
      </Routes>


    {/* This are the objects on the Dark blue bar */}
      <div className='App'>
        <div id="header">
          <div id="Title"><h2><i><a href="/">Stranger's Things</a></i></h2></div>
          <div id="Search">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="What do you need?" id="Bar" value={search} onChange={(ev) => setSearch(ev.target.value)}></input>
              <button id="B">
                <img id="gl" src="./images/search.png"></img>
              </button>
            </form>
          </div>
          
          <Link to={'/Create'}><button className="B" id="Post"><b>New post</b></button></Link>
          <Link to={'/Login'}><button className="B" id="In"><b>Login</b></button></Link>
          <Link to={'/Logout'}><button className="B" id="Off"><b>Sign Off</b></button></Link>
        </div>
      </div>
    </>
  );
}

export default App;
