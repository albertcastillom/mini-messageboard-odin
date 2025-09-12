const {Router} = require("express");
const { randomUUID } = require("node:crypto"); // for stable IDs
const indexRouter = Router();

const userController = require("../controllers/indexController");

indexRouter.get("/", userController.getMessages);

indexRouter.get("/new", userController.getNewMessageForm);  

indexRouter.post("/new", userController.postNewMessage);

// ✅ Details page: /messages/:id
indexRouter.get("/messages/:id", userController.getMessageById);
 

module.exports = indexRouter;
