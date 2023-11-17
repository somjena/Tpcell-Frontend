import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import uservalidation from "../uservalidation"
import Header from "./Header"
import SideBar from "./SideBar"

function RegisterPage(){
    const [user,setUser]=useState(null)
    const [selectedPhoto,setSelectedPhoto]=useState(null)
    const [file,setFile]=useState(null)
    const [errors,setErrors]=useState({})    
    const [emailerr,setEmailErr]=useState(null)
 
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedPhoto(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))    
        handleInput(e)    
    }

    const handleVerify = e=>{
        axios.get("http://localhost:8080/api/users/verify?email="+e.target.value)
        .then(resp=>{
            console.log(resp.data)
            if(resp.data.status==="error"){
                alert(resp.data.error)
            }
            resp.data.status==="error" ? setEmailErr(resp.data.error) : setEmailErr(null)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(uservalidation(user)) 
        
        if(Object.keys(errors).length===0){
            console.log(user)
            const formData=new FormData()
            formData.append("photo",selectedPhoto)
            formData.append("sname",user.name)
            formData.append("branch",user.branch)
            formData.append("address",user.address)
            formData.append("gender",user.gender)
            formData.append("phone",user.phone)
            formData.append("email",user.email)
            formData.append("dob",user.dob)
            formData.append("pwd",user.pwd)

            console.log(user)
            axios.post("http://localhost:8080/api/students",formData)
            .then(resp=>{
                console.log(resp)
                setUser(null)
                setSelectedPhoto(null)
                e.target.reset()
                alert("Student registered successfully")
            })
            .catch(error=>console.log("Error",error))            
        }    
    }

    useEffect(()=>{        
        console.log(errors)  
    },[])
    return(
        <>
        <Header/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-9">
            <div className="card shadow mx-auto mt-3">
            <div className="card-body">
            <h4 className="text-center p-2">
                Student Registration Form
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-2 offset-1">
                        <h5 className="p-2">Profile Photo</h5>
                        {selectedPhoto ? <img className="img-thumbnail" src={file} alt="Photo" /> : 
                        <img className="img-thumbnail" src={'images/image.png'} alt="Photo" />} 
                        <input type="file" value={user?.photo} name="photo" onChange={handleFileInput} className="form-control-file" accept=".jpg,.png" />
                        {errors?.photo && <small className="text-danger float-right">{errors?.photo}</small>}                        
                    </div>
                    <div className="col-sm-6 offset-1">
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Student Name</label>
                            <div className="col-sm-8">
                                <input type="text" name="name" value={user?.name} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.name && <small className="text-danger float-right">{errors?.name}</small>}                            
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Address</label>
                            <div className="col-sm-8">
                                <input type="text" name="address" value={user?.address} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.address && <small className="text-danger float-right">{errors?.address}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Gender</label>
                            <div className="col-sm-8">
                                <select name="gender" value={user?.gender} onChange={handleInput} className="form-control form-control-sm">
                                    <option value="">Select Gender</option>
                                    <option>Male</option>     
                                    <option>Female</option>     
                                </select> 
                                {errors?.gender && <small className="text-danger float-right">{errors?.gender}</small>}                      
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Email Id</label>
                            <div className="col-sm-8">
                                <input type="email" name="email" value={user?.email} onBlur={handleVerify} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.email && <small className="text-danger float-right">{errors?.email}</small>}
                                {emailerr && <small className="text-danger float-right">{emailerr}</small>}
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Date of Birth</label>
                            <div className="col-sm-8">
                                <input type="date" name="dob" value={user?.dob} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.dob && <small className="text-danger float-right">{errors?.dob}</small>}
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Phone</label>
                            <div className="col-sm-8">
                                <input type="text" maxLength="10" name="phone" value={user?.phone} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.phone && <small className="text-danger float-right">{errors?.phone}</small>}
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Branch</label>
                            <div className="col-sm-8">
                                <input type="text" name="branch" value={user?.branch} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.branch && <small className="text-danger float-right">{errors?.branch}</small>}
                            </div>                        
                        </div>
                        
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Password</label>
                            <div className="col-sm-8">
                                <input type="password" name="pwd" value={user?.pwd} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.pwd && <small className="text-danger float-right">{errors?.pwd}</small>}
                            </div>
                        </div>                        
                        <button className="btn btn-primary btn-sm float-right">Register Now</button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            </>
    )
}

export default RegisterPage;