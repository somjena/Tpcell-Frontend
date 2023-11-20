const hodvalidation=(values)=>{
    let errors={}
    if(!values?.name){
        errors.name="Name is required"
    }
    if(!values?.address){
        errors.address="Address is required"
    }
    if(!values?.email){
        errors.email="Email Id is required"
    }
    if(!values?.dept){
        errors.dept="Department is required"
    }
    if(!values?.gender){
        errors.gender="Gender is required"
    }

    if(!values?.phone){
        errors.phone="Phone no is required"
    }
    if(!values?.pwd){
        errors.pwd="Password is required"
    }

    return errors;
}

export default hodvalidation;