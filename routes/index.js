const express = require("express");
const router = express.Router();

const {
	userAuth,
	adminAuth,
} = require("~/middlewares/authentication");

router.get("", (req, res) => {
	res.render("index.html");
});
router.use("/auth", require("~/routes/auth.route"));
router.use(
	"/khach",
	userAuth,
	adminAuth,
	require("~/routes/khach.route")
);
router.use("/pt", userAuth, require("~/routes/pt.route"));
module.exports = router;
