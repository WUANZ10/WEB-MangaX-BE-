import Comment from '../models/commentModel.js'
import commentService from '../services/commentService.js'
const commentController=({
    getAllComment:async(req,res)=>{
        try{
            const {userId}=req.params
            const data=await Comment.find({userId:userId})
            res.done(data)
        }catch(err){
            return res.serverErorr({err})
        }
    },
    createComment:async(req,res)=>{
        try{
            const {userId,albumId,chapterId,content}=req.body
            if(content.trim()===''){
                return res.status(401).send({
                    message:'Cần nhập comment'
                })
            }
            const comment_data={userId,albumId,chapterId,content}
            const response=await commentService.createComment(comment_data)
            return res.done(response.data)
        }catch(err){
            return res.serverErorr({err})
        }
    },
    deleteComment:async(req,res)=>{
        try{
            const {commentUserId,albumId,chapterId}=req.body
            const {userId}=req.params
            if(userId!==commentUserId){
                return res.status(400).send({
                    message:"không phải chủ comment"
                })
            }
            const data=await Comment.deleteOne({commentUserId,albumId,chapterId})
            if(data.deletedCount===0){
                return res.status(404).send({
                    message:"không tìm thấy data xóa"
                })
            }
            return res.status(200).send({
                message:"đã xóa comment"
            })
        }catch(err){
            return res.serverErorr({err})
        }
    }
})
export default commentController