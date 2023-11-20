import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function CompJobs(){
    const navigate=useNavigate()
    const [job,setjob]=useState([])
    const role=sessionStorage.getItem("role")
    const cid=sessionStorage.getItem("id")
    const loadData=()=>{
        let url="http://localhost:8080/api/company/jobs"
        if(role==="Company")
            url="http://localhost:8080/api/company/jobs/"+cid
        axios.get(url)
        .then(resp=>{
            setjob(resp.data.data)
            console.log(job)
        })
    }
    const handleDelete=id=>{
        let result=window.confirm('Are you sure to delete this record ?');
        if(result){
            axios.delete("http://localhost:8080/api/company/jobs/"+id)
            .then(resp=>{
                alert(resp.data.data)
                console.log(resp.data)
                loadData()
            })
            .catch(error=>{
                console.log(error)
            })
        }        
    }

    const handleView=id=>{
         navigate("/jobs/"+id)     
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
                    {role==="Company"?(
                        <a href="/addjob" className="float-right btn btn-sm btn-primary m-2">Add New</a>
                    ):""}
                    <h4 className="text-left p-2 border-bottom border-success">All Jobs</h4>
                    <table className="table table-bordered table-light table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Company Name</th>
                        <th>Designation</th>
                        <th>12th Percentage</th>
                        <th>Graduation GPA</th>
                        <th>Salary Package</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {job.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.company.cname}</td>
                        <td>{x.designation}</td>
                        <td>{x.xiithpercent}</td>
                        <td>{x.gradgpa}</td>
                        <td>{x.salpackage}</td>
                        <td>
                            {role==="Company"?(<button onClick={e=>handleDelete(x.id)} className="btn btn-danger btn-sm mr-2">Delete</button>):""}
                            <button onClick={e=>handleView(x.id)} className="btn btn-primary btn-sm">View</button>
                        </td>
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

export default CompJobs;