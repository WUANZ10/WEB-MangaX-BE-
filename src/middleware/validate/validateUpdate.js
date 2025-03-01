import Joi from 'joi'

export const validateUpdate=async(req,res,next)=>{
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