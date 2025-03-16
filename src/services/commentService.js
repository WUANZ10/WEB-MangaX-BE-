import Album from "../models/albumModel.js"
import User from "../models/userModel.js"
import Chapter from "../models/chapterModel.js"
import Comment from "../models/commentModel.js"

const commentService={
    createComment:async(data)=>{
        try{
            const dataUser=await User.findOne({_id:data.userId})
            const dataAlbum=await Album.findOne({_id:data.albumId})
            const dataChapter=await Chapter.findOne({_id:data.chapterId})
            if(!dataUser && !dataAlbum && !dataChapter){
                return{
                    status:'error',
                    message:'ko thể tìm thấy data'
                }
            }
            const createComment=await Comment.create({
                user_id:data.userId,
                album_id:data.albumId,
                chapter_id:data.chapterId,
                content:data.content
            })
            return createComment
        }catch(err){
            return{
                status:'error',
                message:'lỗi server'
            }
        }
    }
}



export default commentService