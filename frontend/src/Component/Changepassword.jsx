import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function ChangePassword(){
    const [user,setUser]=useState({
        "userid":sessionStorage.getItem("userid"),
        "pwd":"",
        "old":"",
        "cpwd":""
    })
    const [errmsg,setErr]=useState(null)
    const [success,setSuccess]=useState(null)

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        console.log("info",user)
        axios.post("http://localhost:8080/api/users/changepwd",user)
        .then(resp=>{
            console.log(resp.data) 
            if(resp.data.status=='error'){
                setErr(resp.data.error)
                setSuccess(null)
            }else{
                setSuccess("Password updated successfully") 
                setErr(null)  
                setUser({
                    "userid":sessionStorage.getItem("userid"),
                    "pwd":"",
                    "old":"",
                    "cpwd":""
                })                            
            }
        })
        .catch(error=>{
            console.log("Error",error);
        }) 
    }

    return(
        <>
        <Header/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-5 offset-2">
                    <div className="card shadow mt-3">
                        <div className="card-header">
                            <h5>Change Password</h5>
                        </div>
                        <div className="card-body">
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 col-form-label">Current Password</label>
                                    <div className="col-sm-8">
                                    <input type="password" required name="old" value={user.old} onChange={handleInput} className="form-control"
                                        placeholder="Current Password"/>
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 col-form-label">New Password</label>
                                    <div className="col-sm-8">
                                    <input type="password" required name="pwd" value={user.pwd} onChange={handleInput} className="form-control"
                                        placeholder="New Password"/>
                                        </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 col-form-label">Confirm Password</label>
                                    <div className="col-sm-8">
                                    <input type="password" required name="cpwd" value={user.cpwd} onChange={handleInput} className="form-control"
                                        placeholder="Repeat Password"/>
                                        </div>
                                </div>
                                <input type="submit" value="Change Password" className="btn btn-primary float-right"/>
                            </form>  
                        </div>
                    </div>
                    {errmsg !=null ? (
                        <div className="alert text-danger text-center font-weight-bold">
                            {errmsg}
                        </div>
                    ): ''}
                    {success !=null ? (
                        <div className="alert text-success text-center font-weight-bold">
                            {success}
                        </div>
                    ): ''}
                </div>
            </div>
        </div>
        </>
    )
}

export default ChangePassword;