const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminServices = require("../services/admin");

const router = Router({ strict: true });

router.post("/login", adminServices.login);
router.post("/register", adminServices.register);
router.post("/addnewTask",adminServices.addnewtask);
router.get("/getallTask",adminServices.getalltasks);
router.put("/updateTask/:id",adminServices.updatetask);
router.delete("/deleteTask/:id",adminServices.deletetask);
router.get("/auth-admin", isAuth, adminServices.getAuthAdmin);

module.exports = router;
