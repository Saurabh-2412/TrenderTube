import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexter/AuthContext";
import { Toaster } from "../Utils/Toaster";

export function Login(){
	const navigate = useNavigate();
    const { isUserLoggedIn, setIsUserLoggedIn, token } = useAuth();
	const usernameRef = React.useRef();
	const passwordRef = React.useRef();

    async function handleSubmit() {
        axios.interceptors.request.use(
			config => {
				config.headers.authorization = token;
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		)

		if(!isUserLoggedIn){
			try{
				const userId = usernameRef.current.value;
				const password = passwordRef.current.value;
				if(userId !== "" || password !== "") {
					const { data,status } = await axios.post(
						"https://VideoLibraryData.saurabhsharma11.repl.co/v1/userData/60d57b0978730d00e0b096a4",
						{ userId:userId, password: password }
					);
					if(status === 200){
						setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
						isUserLoggedIn || navigate("/");
						localStorage?.setItem(
							"login",
							JSON.stringify({ isUserLoggedIn:true, token:data.token })
						);
						Toaster("Logged In successfully")
					} else if(status === 401 || status === 500){
						Toaster("Invalid UserID or Password..!");
					}
				} else {
					Toaster("Please enter valid UserID or Password..!");
				}
			}
			catch(err){
				Toaster("Invalid UserID or Password..!");
			}
		} else {
			setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
			isUserLoggedIn || navigate("/");
			localStorage?.removeItem("login");
			Toaster("Logged Out successfully");
		}
	};

    function SignUp(){
		navigate("/register")
	}

    return (
        <div>
            <h1>Login</h1>
            <label style={{marginRight:"15px"}}>UserID</label>
            <input type="text" ref={usernameRef} disabled={isUserLoggedIn ? true : false} required/>
            <br /><br />
            <label style={{marginRight:"4px"}}>Password</label>
            <input type="password" ref={passwordRef} disabled={isUserLoggedIn ? true : false} required/>
            <br /><br />
            <button	onClick={handleSubmit}>
            {/** {isUserLoggedIn ? "Logged In" : "Logged out"} */}
            {isUserLoggedIn ? "Logout" : "Login"}
            </button>
            <button onClick={SignUp} disabled={isUserLoggedIn ? true : false}>SignUp?</button>
			<p>
				UserID : sid@gmail.com<br/>
				Password : 12345
			</p>
        </div>
    )
}