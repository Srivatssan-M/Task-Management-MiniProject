 const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userServices = require("../services/user");

const router = Router({ strict: true });

router.post("/login", userServices.login);
router.post("/register", userServices.register);
router.get("/auth-user", isAuth, userServices.getAuthUser);
router.get("/getallUserData", userServices.getUseinfo);

module.exports = router;
