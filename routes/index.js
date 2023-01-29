var express = require("express");
var router = express.Router();

router.get("", (req, res) => {
	res.render("index.html");
});

router.use("/auth", require("~/routes/auth.router"));

module.exports = router;
