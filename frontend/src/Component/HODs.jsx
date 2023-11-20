import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function Hods(){
    const [Hods,setHods]=useState([])
    const navigate=useNavigate()
    const loadData=()=>{
        axios.get("http://localhost:8080/api/hod")
        .then(resp=>{
            setHods(resp.data.data)
            console.log(Hods)
        })
    }
    const handleEdit = id=>{
        navigate("/hods/"+id)
    }
    const handleDelete=id=>{
        let result=window.confirm('Are you sure to delete this record ?');
        if(result){
            axios.delete("http://localhost:8080/api/hod/"+id)
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
                <a href="/addhod" className="float-right btn btn-sm btn-primary m-2">Add New</a>
                    <h4 className="text-left p-2 border-bottom border-success">All Hods</h4>
                    <table className="table table-bordered table-light table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Email ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Hods.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.address}</td>
                        <td>{x.gender}</td>
                        <td>{x.dept}</td>
                        <td>{x.phone}</td>
                        <td>{x.email}</td>
                        <td>
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

export default Hods;