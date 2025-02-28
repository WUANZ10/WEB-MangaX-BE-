export const basicReponse=(req,res,next)=>{
    res.done=(data,message="done")=>res.status(200).send({message,data})
    res.badRequest=(error,message="Invalid data")=>res.status(400).send({message,error})
    res.notFound=(error,message="Not Found")=>res.status(404).send({message,error})
    res.serverErorr=(error,message="Server Error")=>res.status(500).send({message,error})
    res.unauthorized=(error,message="Unauthorized")=>res.status(401).send({message,error})
    next()
}