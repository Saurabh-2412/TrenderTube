import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from "../src/Contexter/AuthContext";
import { VideoProvider } from "./Contexter/videoContext";
import { LikedVideosProvider } from "./Contexter/likedVideosContext";
import { WatchListProvider } from "./Contexter/watchListContext";
import { PlaylistProvider } from "./Contexter/playListContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <LikedVideosProvider>
            <WatchListProvider>
              <PlaylistProvider>
                <App />
              </PlaylistProvider>
            </WatchListProvider>
          </LikedVideosProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
