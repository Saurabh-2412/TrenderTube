import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserProfile(){
    const  { token } = JSON.parse(localStorage?.getItem("login")) || {};
    const [user, setUserData] = useState([]);
    const navigate = useNavigate();

    axios.interceptors.request.use(
      config => {
        config.headers.authorization = token;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    )

    useEffect(() => {
        (async function () {
          try{
            const { data } = await axios.get(
              "https://VideoLibraryData.saurabhsharma11.repl.co/v1/userData"
            );
            setUserData(data.userData[0]);
          }
          catch(err){
            if(err.status){
              return navigate('/login');
            }
          }
        })();
      },[navigate]);

    return (
        <div>
            <h1 style={{color:"orange",border:"2px solid gray",borderRadius:"5px"}}><em> User Details</em></h1>
            <ul style={{margin:"0",padding:"0"}}>
                <li key={user._id} style={{listStyleType:"none"}}>
                <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Name : {user.name}</div>
                <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>User-ID : {user._id}</div>
                <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Email-ID: {user.mail}</div>
                <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Contact-No : {user.phone}</div>
                </li>
            </ul>
        </div>
    )
}