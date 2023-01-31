const {
	laytatca,
	xoa,
	capnhat,
	laymot,
	dky,
} = require("~/controllers/khach.controller");

const router = require("express").Router();

router.route("/").get(laytatca).post(dky);
router.route("/:id").get(laymot).put(capnhat).delete(xoa);

module.exports = router;
