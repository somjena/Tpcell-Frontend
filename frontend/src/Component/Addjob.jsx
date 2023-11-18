import axios from "axios"
import { useState } from "react"
import jobvalidation from "../jobvalidation"
import Header from "./Header"
import SideBar from "./SideBar"

function AddJob(){
    const [job,setJob]=useState(null)
    const [errors,setErrors]=useState({})
    const cid=sessionStorage.getItem("id")
 
    const handleInput=(e)=>{
        setJob({...job,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(jobvalidation(job)) 
        
        if(Object.keys(errors).length===0){
            job.cid=cid;
            console.log(job)

            axios.post("http://localhost:8080/api/company/jobs",job)
            .then(resp=>{
                console.log(resp)
                setJob(null)
                e.target.reset()
                alert(resp.data.data)
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
                Add New Job
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">                    
                    <div className="col-sm-6 mx-auto">
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Designation</label>
                            <div className="col-sm-8">
                                <input type="text" name="designation" value={job?.designation} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.designation && <small className="text-danger float-right">{errors?.designation}</small>}                            
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Description</label>
                            <div className="col-sm-8">
                                <textarea name="description" onChange={handleInput} rows="4" className="form-control form-control-sm">{job?.description}</textarea>
                                {errors?.description && <small className="text-danger float-right">{errors?.description}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Experience</label>
                            <div className="col-sm-8">
                                <input type="text" name="experience" value={job?.experience} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.experience && <small className="text-danger float-right">{errors?.experience}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">12th Percentage</label>
                            <div className="col-sm-8">
                                <input type="number" name="xiithpercent" value={job?.xiithpercent} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.xiithpercent && <small className="text-danger float-right">{errors?.xiithpercent}</small>}                                
                            </div>
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Graduation GPA</label>
                            <div className="col-sm-8">
                                <input type="number" name="gradgpa" value={job?.gradgpa} onChange={handleInput} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">No of Seats</label>
                            <div className="col-sm-8">
                                <input type="number" name="nos" min="1" value={job?.nos} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.nos && <small className="text-danger float-right">{errors?.nos}</small>}                                
                            </div>
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Salary Package</label>
                            <div className="col-sm-8">
                                <input type="text" name="salpackage" value={job?.salpackage} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.salpackage && <small className="text-danger float-right">{errors?.salpackage}</small>}                                
                            </div>
                        </div>
                                          
                        <button className="btn btn-primary btn-sm float-right">Submit</button>
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

export default AddJob;