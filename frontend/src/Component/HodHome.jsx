import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

function HodHome(){
    const cid=sessionStorage.getItem("id")
    const [hodInfo,setHodInfo]=useState()
    useEffect(()=>{
        axios.get("http://localhost:8080/api/hod/"+cid)
        .then(resp=>{
            console.log("hod Info",resp.data.data)    
            setHodInfo(resp.data.data)             
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
                <div className="col-sm-6 p-3">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5>HOD Profile</h5>
                        </div>
                        <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>HOD Name</th>
                                    <th>{hodInfo?.name}</th>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <th>{hodInfo?.address}</th>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <th>{hodInfo?.gender}</th>
                                </tr>
                                <tr>
                                    <th>Department</th>
                                    <th>{hodInfo?.dept}</th>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <th>{hodInfo?.phone}</th>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <th>{hodInfo?.email}</th>
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

export default HodHome;