import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

function AppliedJobs(){
    const sid=sessionStorage.getItem("id")
    const [data,setdata]=useState([])
    const loadData=()=>{
        axios.get("http://localhost:8080/api/students/applied/"+sid)
        .then(resp=>{
            setdata(resp.data.data)
            console.log(data)
        })
    }
    const handleDelete=id=>{
        let result=window.confirm('Are you sure to delete this record ?');
               
    }
    useEffect(()=>{
        loadData();
    },[])
    return(
        <>
        <Header/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-10">
                    <h4 className="text-left p-2 border-bottom border-success">My Applied Jobs</h4>
                    <table className="table table-bordered table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Company Name</th>
                        <th>Designation</th>
                        <th>Apply Date</th>
                        <th>Status</th>                        
                    </tr>
                </thead>
                <tbody>
                {data.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.company.cname}</td>
                        <td>{x.job.designation}</td>
                        <td>{x.applydate}</td>
                        <td>{x.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default AppliedJobs;