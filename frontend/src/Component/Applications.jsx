import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function Applications(){
    const cid=sessionStorage.getItem("id")
    const [data,setdata]=useState([])
    const navigate=useNavigate()
    const loadData=()=>{
        axios.get("http://localhost:8080/api/company/applications/"+cid)
        .then(resp=>{
            setdata(resp.data.data)
            console.log(data)
        })
    }
    const handleView=id=>{
        navigate("/application/"+id)    
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
                        <th>Candidate Name</th>
                        <th>Apply Date</th>
                        <th>Status</th> 
                        <th>Action</th>                       
                    </tr>
                </thead>
                <tbody>
                {data.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.student.sname}</td>
                        <td>{x.applydate}</td>
                        <td>{x.status}</td>
                        <td><button onClick={e=>handleView(x.id)} className="btn btn-sm btn-primary">View Details</button></td>
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

export default Applications;