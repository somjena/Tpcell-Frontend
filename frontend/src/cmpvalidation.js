const cmpvalidation=(values)=>{
    let errors={}
    if(!values?.cname){
        errors.cname="Name is required"
    }
    if(!values?.address){
        errors.address="Address is required"
    }
    if(!values?.email){
        errors.email="Email Id is required"
    }
    if(!values?.website){
        errors.dept="Website is required"
    }

    if(!values?.phone){
        errors.phone="Phone no is required"
    }
    if(!values?.pwd){
        errors.pwd="Password is required"
    }

    return errors;
}

export default cmpvalidation;