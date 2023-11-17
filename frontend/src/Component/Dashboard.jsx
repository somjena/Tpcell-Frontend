import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function Dashboard(){
    const [data,setData]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:8080/api/admin/dashboard")
        .then(resp=>{
            setData(resp.data.data)
        })
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
                    <h4 className="text-left p-2 border-bottom border-success">Admin Dashboard</h4>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="card shadow bg-primary text-white text-right" onClick={e=>navigate('/students')}>
                                <div className="card-body">
                                    <h4>Students</h4>
                                    <h5>{data.students}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card shadow bg-success text-white text-right" onClick={e=>navigate('/hods')}>
                                <div className="card-body">
                                    <h4>HODs</h4>
                                    <h5>{data.hods}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card shadow bg-danger text-white text-right" onClick={e=>navigate('/companies')}>
                                <div className="card-body">
                                    <h4>Company</h4>
                                    <h5>{data.company}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card shadow bg-info text-white text-right" onClick={e=>navigate('/selections')}>
                                <div className="card-body">
                                    <h4>Selected Students</h4>
                                    <h5>{data.selected}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;