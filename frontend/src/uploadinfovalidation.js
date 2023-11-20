const uservalidation=(values)=>{
    let errors={}
    if(!values?.college){
        errors.college="College Name is required"
    }
    if(!values?.branch){
        errors.branch="Branch is required"
    }
    if(!values?.xthyear){
        errors.xthyear="10th year is required"
    }
    if(!values?.xthpercent){
        errors.xthpercent="10th Percentage is required"
    }
    if(!values?.xiithyear){
        errors.xiithyear="12th year is required"
    }
    if(!values?.xiithpercent){
        errors.xiithpercent="12th Percentage is required"
    }
    if(!values?.gradgpa){
        errors.gradgpa="Graduation GPA is required"
    }

    if(!values?.resume){
        errors.resume="Resume is required"
    }

    if(!values?.gradyear){
        errors.gradyear="Graduation year is required"
    }

    return errors;
}

export default uservalidation;