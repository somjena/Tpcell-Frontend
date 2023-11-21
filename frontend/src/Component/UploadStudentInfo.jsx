import axios from "axios"
import { useEffect, useState } from "react"
import uservalidation from "../uploadinfovalidation"
import Header from "./Header"
import SideBar from "./SideBar"

function UploadStudentInfo(){
    const cid=sessionStorage.getItem("id")
    useEffect(()=>{
        axios.get("http://localhost:8080/api/students/"+cid)
        .then(resp=>{
            console.log("Student Info",resp.data.data) 
            setUser(resp.data.data)   
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const [user,setUser]=useState(null)
    const [errors,setErrors]=useState({})
    const [selectedResume,setSelectedResume]=useState(null)
 
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedResume(e.target.files[0])
        handleInput(e)    
    }

    const downloadResume = id=>{
        console.log(user?.resume)
        window.location.href="http://localhost:8080/"+user?.resume;
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(uservalidation(user)) 
        console.log("User Info",user)
        
        if(Object.keys(errors).length===0){
            const formData=new FormData()
            if(selectedResume!=null)
                formData.append("resume",selectedResume)
            formData.append("xthyear",user.xthyear)
            formData.append("xthpercent",user.xthpercent)
            formData.append("xiithyear",user.xiithyear)
            formData.append("xiithpercent",user.xiithpercent)
            formData.append("gradyear",user.gradyear)
            formData.append("gradgpa",user.gradgpa)
            formData.append("id",cid)
            axios.post("http://localhost:8080/api/students/upload",formData)
            .then(resp=>{
                console.log(resp)
                setUser(null)
                e.target.reset()
                alert(resp.data.data)
                window.location.href="uploadinfo"
            })
            .catch(error=>console.log("Error",error))            
        }    
    }

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
                Upload Student Info
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">                    
                    <div className="col-sm-6 mx-auto">
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">10th Pass Year</label>
                            <div className="col-sm-8">
                                <input type="number" min="2000" name="xthyear" value={user?.xthyear} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.xthyear && <small className="text-danger float-right">{errors?.xthyear}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">10th Percentage</label>
                            <div className="col-sm-8">
                                <input type="number" name="xthpercent" value={user?.xthpercent} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.xthpercent && <small className="text-danger float-right">{errors?.xthpercent}</small>}                                
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">12th Pass Year</label>
                            <div className="col-sm-8">
                                <input type="number" min="2000" name="xiithyear" value={user?.xiithyear} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.xiithyear && <small className="text-danger float-right">{errors?.xiithyear}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">12th Percentage</label>
                            <div className="col-sm-8">
                                <input type="number" name="xiithpercent" value={user?.xiithpercent} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.xiithpercent && <small className="text-danger float-right">{errors?.xiithpercent}</small>}                                
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Graduation Year</label>
                            <div className="col-sm-8">
                                <input type="number" min="2000" name="gradyear" value={user?.gradyear} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.gradyear && <small className="text-danger float-right">{errors?.gradyear}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Graduation GPA</label>
                            <div className="col-sm-8">
                                <input type="number" name="gradgpa" value={user?.gradgpa} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.gradgpa && <small className="text-danger float-right">{errors?.gradgpa}</small>}                                
                            </div>
                        </div>                                            
                        
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Resume</label>
                            <div className="col-sm-8">
                                <input type="file" name="resume" accept=".doc,.docx" onChange={handleFileInput} className="form-control-file form-control-sm" />                                
                            </div>
                        </div>                        
                        <button className="btn btn-primary btn-sm float-right">Submit</button>
                        {user?.resume!=null ? <button onClick={e=>downloadResume(user?.resume)} type="button" className="btn btn-primary btn-sm float-right mr-2">Download Resume</button> : ""}
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

export default UploadStudentInfo;