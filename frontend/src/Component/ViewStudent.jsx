import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function ViewStudent(){
    const {cid}=useParams("cid")
    const [studentInfo,setStudentInfo]=useState()
    const downloadResume = id=>{
        console.log(studentInfo?.resume)
        window.location.href="http://localhost:8080/"+studentInfo?.resume;
    }
    useEffect(()=>{
        axios.get("http://localhost:8080/api/students/"+cid)
        .then(resp=>{
            console.log("Student Info",resp.data.data)    
            setStudentInfo(resp.data.data)             
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
                <div className="col-sm-2 pt-3">
                    <img src={"http://localhost:8080/"+studentInfo?.photo} className="img-thumbnail" />
                </div>
                <div className="col-sm-6 p-3">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5>Student Details</h5>
                        </div>
                        <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Student Name</th>
                                    <th>{studentInfo?.sname}</th>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <th>{studentInfo?.address}</th>
                                </tr>
                                <tr>

                                    <th>Gender</th>
                                    <th>{studentInfo?.gender}</th>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <th>{studentInfo?.phone}</th>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <th>{studentInfo?.email}</th>
                                </tr> 
                                <tr>
                                    <th>Branch Name</th>
                                    <th>{studentInfo?.branch}</th>
                                </tr> 
                                <tr>
                                    <th>10th Percentage and year</th>
                                    <th>{studentInfo?.xthpercent}% ({studentInfo?.xthyear})</th>
                                </tr>                                
                                <tr>
                                    <th>12th Percentage and year</th>
                                    <th>{studentInfo?.xiithpercent}% ({studentInfo?.xiithyear})</th>
                                </tr>
                                <tr>
                                    <th>Graduation GPA and year</th>
                                    <th>{studentInfo?.gradgpa} ({studentInfo?.gradyear})</th>
                                </tr> 
                                <tr>
                                    <th>Resume</th>
                                    <th>{studentInfo?.resume!=null ? <button onClick={e=>downloadResume(studentInfo?.resume)} type="button" className="btn btn-primary btn-sm">Download Resume</button> : ""}</th>
                                </tr>                                
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )}

export default ViewStudent;