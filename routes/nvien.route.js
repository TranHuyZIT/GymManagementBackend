const {
	laytatcanvien,
	dkynvien,
	capnhatnvien,
	laymotnvien,
	xoanvien,
} = require("~/controllers/nhanvien.controller");
const {
	userAuth,
	adminAuth,
} = require("~/middlewares/authentication");

const router = require("express").Router();

router
	.route("/")
	.get(userAuth, adminAuth, laytatcanvien)
	.post(dkynvien);
router
	.route("/:id")
	.put(userAuth, adminAuth, capnhatnvien)
	.get(laymotnvien)
	.delete(userAuth, adminAuth, xoanvien);

module.exports = router;
