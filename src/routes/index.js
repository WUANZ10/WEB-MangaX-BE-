import userRouter from "./userRouter.js"
import albumRouter from "./albumRouter.js"
import commentRouter from "./commentRouter.js"
import chapterRouter from "./chapterRouter.js"

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/album", albumRouter);
  app.use("/api/comment",commentRouter)
  app.use("/api/chapter",chapterRouter)
};

export default routes;
