import userRouter from "./userRouter.js"
import albumRouter from "./albumRouter.js"
import commentRouter from "./commentRouter.js"

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/album", albumRouter);
  app.use("/api/comment",commentRouter)
};

export default routes;
