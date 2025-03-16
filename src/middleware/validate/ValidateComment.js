import Joi from 'joi'

export const validateComment=async(req,res,next)=>{
    const createCommentValidate=Joi.object({
        content:Joi.string().min(2).max(50).required()
    })
    try{
        await createCommentValidate.validateAsync(req.body,{abortEarly:false})
        next()
    }catch(err){
        return res.badRequest({err})
    }
}