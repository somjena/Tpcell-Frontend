import axios from "axios"
import { useEffect, useState } from "react"
import datavalidation from "../uploadinfovalidation"
import Header from "./Header"
import SideBar from "./SideBar"

function Settings(){    
    useEffect(()=>{
        axios.get("http://localhost:8080/api/admin/settings")
        .then(resp=>{
            console.log("Settings data",resp.data.data) 
            setData(resp.data.data)   
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const [data,setData]=useState(null)
    const [errors,setErrors]=useState({})
 
    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(datavalidation(data)) 
        console.log("data Info",data)
        
        if(Object.keys(errors).length===0){
            axios.post("http://localhost:8080/api/admin/settings",data)
            .then(resp=>{
                console.log(resp)
                setData(null)
                e.target.reset()
                alert(resp.data.data)
                window.location.href="settings"
            })
            .catch(error=>console.log("Error",error))            
        }    
    }

    return(
        <>
        <Header/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-9">
            <div className="card shadow mx-auto mt-3">
            <div className="card-body">
            <h4 className="text-center p-2">
                College Information
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">                    
                    <div className="col-sm-6 mx-auto">
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">College Name</label>
                            <div className="col-sm-8">
                                <input type="text" name="college" value={data?.college} onChange={handleInput} className="form-control form-control-sm" />
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Address</label>
                            <div className="col-sm-8">
                                <input type="text" name="address" value={data?.address} onChange={handleInput} className="form-control form-control-sm" />
                            </div>                        
                        </div>

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Website</label>
                            <div className="col-sm-8">
                                <input type="text" name="website" value={data?.website} onChange={handleInput} className="form-control form-control-sm" />
                            </div>                        
                        </div>

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Email Address</label>
                            <div className="col-sm-8">
                                <input type="text" name="email" value={data?.email} onChange={handleInput} className="form-control form-control-sm" />
                            </div>                        
                        </div> 

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Phone</label>
                            <div className="col-sm-8">
                                <input type="text" maxLength="10" name="phone" value={data?.phone} onChange={handleInput} className="form-control form-control-sm" />
                            </div>                        
                        </div>  

                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Dean Name</label>
                            <div className="col-sm-8">
                                <input type="text" name="dean" value={data?.dean} onChange={handleInput} className="form-control form-control-sm" />
                            </div>                        
                        </div>                                                                 
                        
                        <button className="btn btn-primary btn-sm float-right">Submit</button>                        
                    </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            </>
    )
}

export default Settings;