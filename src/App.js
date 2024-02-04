import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Signup from './pages/auth/signup/signup';
import Stage from './pages/staging/stage';
import Home from './pages/home/home';
import ContentCreator from './pages/contentCreator/contentCreator';
import ContentPreview from './pages/contentPreview/contentPreview';
import Publish from './pages/publish/publish';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='app' element={<Stage />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="content" element={<ContentCreator />}></Route>
          <Route path="preview" element={<ContentPreview />}></Route>
        </Route>
        <Route path="publish/:publish_url" element={<Publish />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
