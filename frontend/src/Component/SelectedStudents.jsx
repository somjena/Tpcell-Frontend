import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function SelectedStudents(){
    const cid=sessionStorage.getItem("id")
    const [data,setdata]=useState([])
    const navigate=useNavigate()
    const loadData=()=>{
        axios.get("http://localhost:8080/api/company/selected")
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
                    <h4 className="text-left p-2 border-bottom border-success">Our Placed Students</h4>
                    <div className="row">
                    {data.map(x=>(
                        <div className="col-sm-3">
                        <div className="card shadow">
                            <img src={"http://localhost:8080/"+x.student.photo} style={{height:"200px"}} className="card-img-top" />
                            <div className="card-body text-center">
                            <h6>{x.student.sname}</h6>
                            <h6>(Branch: {x.student.branch})</h6>
                            <h6>{x.company.cname}</h6>
                            <h6>(Designation: {x.job.designation})</h6>
                            <h6>(Salary Package: {x.job.salpackage})</h6>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>                    
                </div>
            </div>
        </div>
        </>
    )
}

export default SelectedStudents;