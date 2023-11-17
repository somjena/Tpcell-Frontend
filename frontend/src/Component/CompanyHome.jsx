import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

function CompanyHome(){
    const cid=sessionStorage.getItem("id")
    const [companyInfo,setCompanyInfo]=useState()
    useEffect(()=>{
        axios.get("http://localhost:8080/api/company/"+cid)
        .then(resp=>{
            console.log("company Info",resp.data.data)    
            setCompanyInfo(resp.data.data)             
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
                            <h5>Company Profile</h5>
                        </div>
                        <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>company Name</th>
                                    <th>{companyInfo?.cname}</th>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <th>{companyInfo?.address}</th>
                                </tr>
                                <tr>
                                    <th>Website</th>
                                    <th>{companyInfo?.website}</th>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <th>{companyInfo?.phone}</th>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <th>{companyInfo?.email}</th>
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

export default CompanyHome;