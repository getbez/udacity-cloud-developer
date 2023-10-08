import { useEffect, useState } from 'react';
import './App.css';
import authClient from './api/authClient';
import missingPeopleUploadClient from './api/missingPeopleUploadClient';
import LoginForm from './components/LoginForm';
import MissingPeopleUploadForm from './components/MissingPeopleUpload';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const [token, setToken] = useState('')
  const [filteredImage, setFilteredImage] = useState([])
  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(()=>{
    const accessToken = window.sessionStorage.getItem('token')
    if (accessToken){
      setToken(accessToken)
      setIsLoggedIn(true)
    }
  },[])

  const getFilteredImage = async (e) => {
    if(!isLoggedIn || !token){
      console.error('user not logged in')
      setUploadSuccess(false);
      return;
    } 
    try{
        e.preventDefault();
        setFilteredImage(await missingPeopleUploadClient.getFilteredImage(token, e.target.imageUrl.value))
        setUploadSuccess(true);
    }
    catch(e){
      console.error('error uploading url');
      setUploadSuccess(false);
    }
  }

  const handleLogin = async (e) => {
    try{
      e.preventDefault()
      const { accessToken } = await authClient.login(e.target.email.value, e.target.password.value)
      setIsLoginFailed(false)
      setIsLoggedIn(true)
      setToken(accessToken)
      window.sessionStorage.setItem('token', accessToken)
    } catch(e){
      console.error('Login failed', e);
      setIsLoginFailed(true)
    }
  };

  const handleLogout = (e) => {
    e.preventDefault()
    window.sessionStorage.removeItem('token')
    setIsLoggedIn(false)
    setToken(null)
    setFilteredImage([])
  }

  return (
    <div className="App">
      {!isLoggedIn ? <LoginForm isLoginFailed={isLoginFailed} handleLogin={handleLogin}/> 
      : <MissingPeopleUploadForm getFilteredImage={getFilteredImage} uploadSuccess={uploadSuccess} filteredImage={filteredImage} handleLogout={handleLogout}/>}
    </div>
  );
}

export default App;
