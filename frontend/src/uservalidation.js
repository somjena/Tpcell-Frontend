const uservalidation=(values)=>{
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
    if(!values?.dob){
        errors.dob="Date of Birth is required"
    }
    if(!values?.gender){
        errors.gender="Gender is required"
    }

    if(!values?.photo){
        errors.photo="Profile Photo is required"
    }

    if(!values?.phone){
        errors.phone="Phone no is required"
    }
    if(!values?.pwd){
        errors.pwd="Password is required"
    }

    return errors;
}

export default uservalidation;