import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function ApplicationDetails(){
    const id=sessionStorage.getItem("id")
    const {aid}=useParams("aid")
    console.log(aid)
    const [info,setInfo]=useState({
        "jid":aid,
        "sid":id,
        "status":""
    })
    const [data,setData]=useState()
    const handleApply=e=>{
        axios.post("http://localhost:8080/api/students/apply",data?.job)
        .then(resp=>{
            alert(resp.data.job.data?.job)
        })
        .catch(err=>{
            console.log("Error",err)
        })
    }
    const handleUpdate=(status)=>{
        info.status=status
        console.log(info)
        axios.post("http://localhost:8080/api/company/applications/update",info)
        .then(resp=>{
            alert(resp.data.data)
        })
        .catch(err=>{
            console.log("Error",err)
        })
    }
    useEffect(()=>{
        axios.get("http://localhost:8080/api/company/applications/details/"+aid)
        .then(resp=>{
            console.log("student Info",resp.data.data?.job.data?.job)    
            setData(resp.data.data)            
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <>
        <Header/>   
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-4 p-3">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5>Job Profile</h5>
                        </div>
                        <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Designation</th>
                                    <th>{data?.job?.designation}</th>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <th>{data?.job?.description}</th>
                                </tr>
                                <tr>
                                    <th>Experience</th>
                                    <th>{data?.job?.experience}</th>
                                </tr>
                                <tr>
                                    <th>12th Percentage</th>
                                    <th>{data?.job?.xiithpercent}%</th>
                                </tr>
                                <tr>
                                    <th>Graduation GPA</th>
                                    <th>{data?.job?.gradgpa}</th>
                                </tr>
                                <tr>
                                    <th>No of seats</th>
                                    <th>{data?.job?.nos}</th>
                                </tr>                           
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-6 p-3">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5>Candidate Profile</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                <img src={"http://localhost:8080/"+data?.student?.photo} className="img-thumbnail float-left" />                        
                                </div>
                                <div className="col-sm-9">
                                <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Candidate Name</th>
                                    <th>{data?.student?.sname}</th>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <th>{data?.student?.address}</th>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <th>{data?.student?.gender}</th>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <th>{data?.student?.phone}</th>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <th>{data?.student?.email}</th>
                                </tr>
                                <tr>
                                    <th>10th Percent</th>
                                    <th>{data?.student?.xthpercent}%</th>
                                </tr>
                                <tr>
                                    <th>12th Percent</th>
                                    <th>{data?.student?.xiithpercent}%</th>
                                </tr>
                                <tr>
                                    <th>Graduation GPA</th>
                                    <th>{data?.student?.gradgpa}</th>
                                </tr>
                                <tr>
                                    <th colSpan="2">
                                        <button onClick={e=>handleUpdate('Approved')} className="btn btn-success ml-2 btn-sm float-right">Approve</button>
                                        <button onClick={e=>handleUpdate('Rejected')} className="btn btn-danger btn-sm float-right">Reject</button>
                                    </th>
                                </tr>                           
                            </tbody>
                        </table>
                                </div>
                            </div>                        
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )}

export default ApplicationDetails;