import Joi from 'joi'

export const validateUserUpdate=async(req,res,next)=>{
    const createUserValidate=Joi.object({
        _id:Joi.string(),
        username:Joi.string().trim().max(15).required(),
        introduce:Joi.string().max(500).allow(""),
        avatar:Joi.string().allow("")
    })
    try{
        await createUserValidate.validateAsync(req.body,{abortEarly:false})
        next()
    }catch(err){
        return res.badRequest({err})
    }
}

export const validatePasswordUpdate=async(req,res,next)=>{
    const checkpass=Joi.object({
        newpass:Joi.string().min(8).pattern(/^(?=.*[A-Z])(?=.*\d).*$/).max(25).required(), // .* lấy bất kì kí tự nào kể cả rỗng - \d = digit (số)
        verifypass:Joi.string().valid(Joi.ref("newpass")).required().messages({"any.only":"Mật khẩu không trùng"}) // messages ko phải message 
    })
    try{
        await checkpass.validateAsync(req.body,{abortEarly:false})
        next()
    }catch(err){
        return res.status(400).json({ message: "Cần nhập mật khẩu ít nhất: 1 chữ hoa và 1 số" });
    }
}