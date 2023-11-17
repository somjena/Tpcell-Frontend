import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import loginvalidation from "../loginvalidation"


function LoginPage(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [errmsg,setErrmsg]=useState(null)

    const [user,setUser]=useState()
    const [errors,setErrors]=useState({})

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(loginvalidation(user))   
        if(Object.keys(errors).length===0){
            console.log(user)
            axios.post("http://localhost:8080/api/users/validate",user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.uname)
                sessionStorage.setItem("role",result.role)
                sessionStorage.setItem("id",result.cid)  
                dispatch({type:'IsLoggedIn'})
                if(result.role==='Admin')
                    navigate("/dashboard")
                else if(result.role==="Student")
                    navigate("/shome")
                else if(result.role==="HOD")
                    navigate("/hhome")
                else if(result.role==="Company")
                    navigate("/chome")
            })
            .catch(error=>{
                console.log("Error",error);
                setErrmsg("Invalid username or password");
            })            
        }
    }

    return(
        <div className="login">
            <div className="jumbotron p-4 text-white text-center border-bottom mb-0 bg-dark">
                <h4>College Placement System</h4>    
            </div>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-sm-5 mx-auto">
                        <form className="card shadow mt-5"  onSubmit={handleSubmit}>
                            <div className="card-header">
                                <h5 className="text-center">Login Page</h5>
                            </div>                             
                            <div className="card-body">
                                <div className="form-group form-row">
                                    <label className="col-sm-4 col-form-label">User Id</label>
                                    <div className="col-sm-8">
                                    <input type="text" name="userid" required className="form-control" placeholder="User Id"  value={user?.userid} onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 col-form-label">Password</label>
                                    <div className="col-sm-8">
                                    <input type="password" required className="form-control" name="pwd" placeholder="Password" value={user?.pwd} onChange={handleInput} />
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Role</label>
                                    <div className="col-sm-8">
                                        <select name="role" required value={user?.role} onChange={handleInput} className="form-control form-control-sm">
                                            <option value="">Select Role</option>
                                            <option>Admin</option>     
                                            <option>HOD</option>     
                                            <option>Student</option>     
                                            <option>Company</option>     
                                        </select>                                                               
                                    </div>                        
                                </div>
                                <button className="btn btn-primary float-right">Login</button>
                            </div>
                            {errmsg !=null ? (
                                <div className="alert text-danger text-center font-weight-bold">
                                    {errmsg}
                                </div>
                            ): ''}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;