import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
var classNames = require('classnames');

function SideBar(){    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const role=sessionStorage.getItem("role")
    const navclass="list-group-item list-group-item-action p-2 text-left";
    console.log(location.pathname)
    const logout=()=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        navigate("/");
    }
    return(
<div className="list-group list-group-flush">
    {role==="Admin" ? (<>
        <Link to="/dashboard" className={classNames(navclass,{"active":location.pathname=="/dashboard"})}>Dashboard</Link>                                                                                                
        <Link to="/students" className={classNames(navclass,{"active":location.pathname=="/students"})}>Students</Link>
        <Link to="/hods" className={classNames(navclass,{"active":location.pathname=="/hods"})}>HODs</Link>
        <Link to="/companies" className={classNames(navclass,{"active":location.pathname=="/companies"})}>Companies</Link>
        <Link to="/jobs" className={classNames(navclass,{"active":location.pathname=="/jobs"})}>Openings</Link>
        <Link to="/selections" className={classNames(navclass,{"active":location.pathname=="/selections"})}>Selected Students</Link>
        <Link to="/settings" className={classNames(navclass,{"active":location.pathname=="/settings"})}>College Info</Link>
        </>): role==="Student" ? (
            <>
        <Link to="/shome" className={classNames(navclass,{"active":location.pathname=="/shome"})}>Home</Link>
        <Link to="/uploadinfo" className={classNames(navclass,{"active":location.pathname=="/uploadinfo"})}>Upload Info</Link>
        <Link to="/jobs" className={classNames(navclass,{"active":location.pathname=="/jobs"})}>Openings</Link>
        <Link to="/appliedjobs" className={classNames(navclass,{"active":location.pathname=="/appliedjobs"})}>Applied Jobs</Link>
    </>) : role==="HOD" ? (<>
        <Link to="/hhome" className={classNames(navclass,{"active":location.pathname=="/hhome"})}>Home</Link>
        <Link to="/students" className={classNames(navclass,{"active":location.pathname=="/students"})}>Students</Link>
        <Link to="/jobs" className={classNames(navclass,{"active":location.pathname=="/jobs"})}>Placement Drive</Link>
    </>) :(<>
        <Link to="/chome" className={classNames(navclass,{"active":location.pathname=="/chome"})}>Home</Link>
        <Link to="/jobs" className={classNames(navclass,{"active":location.pathname=="/jobs"})}>Jobs</Link>
        <Link to="/applications" className={classNames(navclass,{"active":location.pathname=="/applications"})}>Applications</Link>        
        </>
    )}
    <Link to="/changepwd" className={classNames(navclass,{"active":location.pathname=="/changepwd"})}>Change Password</Link>
    <button onClick={()=>logout()} className={classNames(navclass,"btn-link")}>Logout</button>
</div>
    )
}

export default SideBar;