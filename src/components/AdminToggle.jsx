import { useState } from "react";
import "./AdminToggle.css";

function AdminToggle({apiFailed, role, setRole, setJwt, setUserName}) {

    const [checked, setChecked] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    const handleToggle =async(e) =>{
        if(apiFailed){
            alert("Backend unavailable.Admin features are disabled in offline mode");
            setChecked(false);
            setRole(null);
            setJwt(null);
            setUserName("");
            return;
        }

        if(e.target.checked){
            const userName = "Admin";
            const password = window.prompt("Enter admin password");
            if(!password || !password.trim()) return;
            try{
                const res = await fetch(`${API_URL}/login`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({userName,password})
                });
                if(res.ok){
                    const data = await res.json();
                    alert(`Login role: ${data.role}`);
                    setChecked(true);
                    setRole(data.role.trim());
                    setJwt(data.token);
                    setUserName(data.userName);
                }else{
                    alert("Invalid admin password");
                    setChecked(false);
                    setRole(null);
                    setJwt(null);
                    setUserName("");
                }
            }catch{
                alert("Backedn error");
                setChecked(false);
                setRole(null);
                setJwt(null);
                setUserName("")
            }
        }else{
            setChecked(false);
                setRole(null);
                setJwt(null);
                setUserName("");
        }
    };


    return (
            <label className="switch">
            <input
            type="checkbox"
            checked ={role === "ADMIN" && checked}
            onChange = {handleToggle}
            disabled={apiFailed} />
            <span className="slider"></span>
            <span className="UserName">
                {role === "ADMIN" ? "Admin mode": "User Mode"}
            </span>
            </label>
    )
}


export default AdminToggle;