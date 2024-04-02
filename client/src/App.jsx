import { useState, useEffect } from 'react'
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { WordBank } from './components/WordBank';
import { Settings } from './components/Settings';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { ArticlePage } from './components/ArticlePage';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState()
  console.log(user)

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className='flex'>
      <Sidebar auth={loggedIn} onLogout={handleLogout} />
      <div className="p-5 pl-[360px] w-full bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={loggedIn ? <Home /> : <Login setUser={setUser} onLogin={handleLogin} />} />
          <Route path="/article/:id" element={loggedIn ? <ArticlePage /> : <Login setUser={setUser} onLogin={handleLogin} />} />
          <Route path="/settings" element={loggedIn ? <Settings /> : <Login setUser={setUser} onLogin={handleLogin} />} />
          <Route path="/wordbank" element={loggedIn ? <WordBank /> : <Login setUser={setUser} onLogin={handleLogin} />} />
          <Route path="/profile" element={loggedIn ? <Profile user={user} /> : <Login setUser={setUser} onLogin={handleLogin} />} />
        </Routes >
      </div>
    </div>

  )
}

export default App
