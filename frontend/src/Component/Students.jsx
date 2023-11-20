import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function Students(){
    const [Students,setStudents]=useState([])
    const navigate=useNavigate()
    const loadData=()=>{
        axios.get("http://localhost:8080/api/students")
        .then(resp=>{
            setStudents(resp.data.data)
            console.log(Students)
        })
    }
    const handleDelete=id=>{
        let result=window.confirm('Are you sure to delete this record ?');
        if(result){
            axios.delete("http://localhost:8080/api/students/"+id)
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
    const handleEdit = id=>{
        navigate("/students/"+id)
    }

    const handleView = id=>{
        navigate("/sview/"+id)
    }

    useEffect(()=>{
        loadData()
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
                    <a href="/addstudent" className="float-right btn btn-sm btn-primary m-2">Add New</a>
                    <h4 className="text-left p-2 border-bottom border-success">All Students</h4>
                    <table className="table table-bordered table-light table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Phone</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Students.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td><img src={"http://localhost:8080/"+x.photo} style={{width:"60px",height:"60px"}} /> {x.sname}</td>
                        <td>{x.address}</td>
                        <td>{x.gender}</td>
                        <td>{x.dob}</td>
                        <td>{x.phone}</td>
                        <td>{x.branch}</td>
                        <td>
                            <button onClick={e=>handleView(x.id)} className="btn btn-info btn-sm mr-2">View</button>
                            <button onClick={e=>handleDelete(x.id)} className="btn btn-danger btn-sm">Delete</button>
                            <button onClick={e=>handleEdit(x.id)} className="btn btn-success ml-2 btn-sm">Edit</button>
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

export default Students;