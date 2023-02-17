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
router.use(
	"/pt",
	userAuth,
	require("~/routes/nvien.route")
);
router.use(
	"/goitap",
	userAuth,
	adminAuth,
	require("~/routes/nvien.route")
);
router.use(
	"/goitap",
	userAuth,
	adminAuth,
	require("~/routes/goitap.route")
);
router.use(
	"/goipt",
	userAuth,
	adminAuth,
	require("~/routes/goipt.route")
);
router.use(
	"/hoadon",
	userAuth,
	require("~/routes/hoadon.route")
);
router.use(
	"/khuyenmai",
	userAuth,
	adminAuth,
	require("~/routes/khuyenmai.route")
);
router.use(
	"/loaithietbi",
	userAuth,
	adminAuth,
	require("~/routes/loaithietbi.route")
);
router.use(
	"/thietbi",
	userAuth,
	adminAuth,
	require("~/routes/thietbi.route")
);

router.use(
	"/thietbiphong",
	userAuth,
	adminAuth,
	require("~/routes/thietbiphong.route")
);

router.use(
	"/lichhd",
	userAuth,
	require("~/routes/lichhd.route")
);

router.use(
	"/phieuktra",
	userAuth,
	require("~/routes/phieuktra.route")
);

router.use(
	"/phieunhap",
	userAuth,
	require("~/routes/phieunhap.route")
);
module.exports = router;
