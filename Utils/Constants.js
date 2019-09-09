'use strict'


//Api Response Format 
const  responseFormat = (statusCode=undefined,Description="",Data=undefined) =>{
    return {"statusCode":statusCode,"Description":Description,"Data":Data};
} 

//Start:Validation Messages
const validErrorGenerate =(accion,field,error)=>{
    //if the error returned is by trying to add an existing record,
    // we show a simpler error
    if(error.code==11000){
        return responseFormat(400,accion,[validFieldExists(field)])
    }else{
        return responseFormat(400,accion,[error.message]);
    }
};

const validFieldRequired = (field)=>`The ${field} is required`;

const validFieldExists = (field)=>`The ${field} already exists`;

const validFieldLengthMin = (field,length)=> `The ${field} must be a minimum of ${length} characters`;

const validFieldLengthMax = (field,length)=> `The ${field} must be a maximum of ${length} characters`;
//End:Validation Messages


//Start: Action Response
 const saveSuccess = (accion)=> `${accion} saved successfully`; 
 const removeSuccess = (accion)=> `${accion} remove successfully`;
 const updateSuccess = (accion)=> `${accion} update successfully`; 
//End: Action Response


module.exports = {
    responseFormat,
    validErrorGenerate,
    validFieldRequired,
    validFieldExists,
    validFieldLengthMin,
    validFieldLengthMax,
    saveSuccess,
    removeSuccess,
    updateSuccess
};

