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
router.use("/khach", require("~/routes/khach.route"));
router.use("/pt", userAuth, require("~/routes/pt.route"));
router.use("/pt", userAuth, require("~/routes/pt.route"));
router.use("/nhanvien", require("~/routes/nvien.route"));
router.use(
	"/goitap",
	userAuth,
	require("~/routes/goitap.route")
);
router.use(
	"/goipt",
	userAuth,
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
	require("~/routes/loaithietbi.route")
);
router.use(
	"/thietbi",
	userAuth,
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
router.use(
	"/entrance",
	userAuth,
	require("~/routes/entrancelog.route")
);
router.use(
	"/doanhthu",
	userAuth,
	require("~/routes/doanhthulog.route")
);
module.exports = router;
