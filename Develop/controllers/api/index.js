const router = require("express").Router();
const userRoutes = require("./userRoutes");
const songRoutes = require("./songRoutes");
//const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/song", songRoutes);
//router.use("/comment", commentRoutes);

module.exports = router;
