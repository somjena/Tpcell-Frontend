const cmpvalidation=(values)=>{
    let errors={}
    if(!values?.designation){
        errors.designation="Designation is required"
    }
    if(!values?.description){
        errors.description="Description is required"
    }
    if(!values?.experience){
        errors.experience="Experience is required"
    }
    if(!values?.xiithpercent){
        errors.xiithpercent="12th Percentage is required"
    }

    if(!values?.nos){
        errors.nos="No of seats is required"
    }

    return errors;
}

export default cmpvalidation;