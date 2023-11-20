const loginvalidation=(values)=>{
    let errors={}
    if(!values.userid){
        errors.userid="User id is required"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    } 
    if(!values.role){
        errors.pwd="Role must be selected"
    }    
    return errors;
}

export default loginvalidation;