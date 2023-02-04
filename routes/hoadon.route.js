const {
	laytatcahoadon,
	taohoadon,
	laymothoadon,
	xoamothoadon,
	luuhoadon,
} = require("~/controllers/hoadon.controller");

const router = require("express").Router();

router.route("/").get(laytatcahoadon).post(taohoadon);
router.route("/:id").get(laymothoadon).delete(xoamothoadon);
router.route("/luu").post(luuhoadon);

module.exports = router;
