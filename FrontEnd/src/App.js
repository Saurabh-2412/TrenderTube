import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { LoadingData } from "../src/Component/Utils/Loader"

import { useAuth } from "./Contexter/AuthContext";
import { VideoListingPage } from "./Component/Video/VideoListingPage";
import { VideoPlayer } from "./Component/Video/VideoPlayer";
import { RecentlyWatched } from "./Component/RecentlyWatched/RecentlyWatched";
import { LikedVideo } from "./Component/LikedVideos/LikedVideo";
import { WatchLater } from "./Component/WatchLater/WatchLater";
import { PlayList } from "../src/Component/PlayList/PlayList";
import { Login } from "../src/Component/UserManagement/Login";
import { UserProfile } from "../src/Component/PrivateRoute/UserProfile";
import { Register } from "../src/Component/UserManagement/Register";
import NavBar from "./Component/NavBar/NavBar";

function App() {
  const { isUserLoggedIn } = useAuth();

  function PrivateRoute({ ...props }) {
    return isUserLoggedIn ? (
      <Route {...props} />
    ) : (
      <Navigate replace to="/login" />
    );
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="" element={<VideoListingPage />} />
        <PrivateRoute path="/videoplayer/:id" element={<VideoPlayer />} />
        <PrivateRoute path="/recentlywatched" element={<RecentlyWatched />} />
        <PrivateRoute path="/likedvideos" element={<LikedVideo />} />
        <PrivateRoute path="/watchlater" element={<WatchLater />} />
        <PrivateRoute path="/playlist" element={<PlayList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <PrivateRoute path="/userprofile" element={<UserProfile/>}/>
      </Routes>
      <ToastContainer />
      <LoadingData/>
    </div>
  );
}

export default App;
