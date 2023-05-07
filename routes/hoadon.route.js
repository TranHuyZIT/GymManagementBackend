const {
	laytatcahoadon,
	taohoadon,
	laymothoadon,
	xoamothoadon,
	luuhoadon,
	duyetHoaDon,
	taohoadonKhach,
} = require("~/controllers/hoadon.controller");

const router = require("express").Router();

router.route("/").get(laytatcahoadon).post(taohoadon);
router.route("/:id").get(laymothoadon).delete(xoamothoadon);
router.route("/luu").post(luuhoadon);
router.route("/duyet").post(duyetHoaDon);
router.route("/khach").post(taohoadonKhach);
module.exports = router;
