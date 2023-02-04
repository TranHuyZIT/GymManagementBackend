const {
	laytatcanvien,
	dkynvien,
	capnhatnvien,
	laymotnvien,
	xoanvien,
} = require("~/controllers/nhanvien.controller");

const router = require("express").Router();

router.route("/").get(laytatcanvien).post(dkynvien);
router
	.route("/:id")
	.put(capnhatnvien)
	.get(laymotnvien)
	.delete(xoanvien);

module.exports = router;
