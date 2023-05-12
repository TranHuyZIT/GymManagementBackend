const {
	laytatca,
	xoa,
	capnhat,
	laymot,
	dkykhach,
	getHistoryGoiTap,
	getHistoryGoiPT,
	getSelfInfo,
	taoKhach,
} = require("~/controllers/khach.controller");
const {
	userAuth,
	adminAuth,
} = require("~/middlewares/authentication");

const router = require("express").Router();

router
	.route("/")
	.get(userAuth, adminAuth, laytatca)
	.post(dkykhach);
router.route("/tao").post(taoKhach);
router.route("/history/goitap/:id").get(getHistoryGoiTap);
router.route("/history/goipt/:id").get(getHistoryGoiPT);
router.route("/info").get(userAuth, getSelfInfo);
router
	.route("/:id")
	.get(userAuth, laymot)
	.put(userAuth, adminAuth, capnhat)
	.delete(userAuth, adminAuth, xoa);

module.exports = router;
