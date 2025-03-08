import userRouter from "./userRouter.js"
import albumRouter from "./albumRouter.js"

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/album", albumRouter);
};

export default routes;
