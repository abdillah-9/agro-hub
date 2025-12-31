function validate_sign_up(req, res, next){
    const { fname, lname, phone_number, user_role, username_or_email, user_password } = req.body;

    //validate non-null inputs
    if(!fname || !lname || !phone_number || !user_role || !username_or_email || !user_password){
       return res.json({status: 500, message: 'All inputs fields are required'});    
    }

    //validate-further
    if(typeof fname !== 'string' || 4 > fname.length || fname.length > 20){
        return res.json({status:500, message:'first name must be string with characters between 4-20'});
    }
    if(typeof lname !== 'string' || 4 > lname.length || lname.length > 20){
        return res.json({status:500, message:'last name must be string with characters between 4-20'});
    }
    if( typeof Number(phone_number) == 'string' || 10 !== phone_number.length){
        return res.json({status:500, message: "phone numbers must be exact 10 numbers EG: 0755200100"});
    }
    if(typeof username_or_email !== 'string'){
        return res.json({status:500, message:'email must be string'});
    }
    if(typeof user_password !== 'string' || 6 > user_password.length || user_password.length > 8){
        return res.json({status:500, message:'password must be string with characters between 6-8'});
    }

    // //validate photo if it's not null (coz photo is optinal);
    // if(req.file && req?.file?.size > 100){                                                                                                  
    //     return res.json({status:500, message: 'damn: '+req.file.size});
    // }
    // if(req.file && req?.file?.mimetype !== 'jpeg' && req?.file?.mimetype !== 'jpg' && req?.file?.mimetype !== 'png'){
    //     return res.json({status:500, message: 'damn: '+req?.file?.size});
    // }

    next();

}
export default validate_sign_up;