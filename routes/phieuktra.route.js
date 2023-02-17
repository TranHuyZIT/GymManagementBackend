const {
	laytatcaphieuktra,
	lapphieuktra,
	laymotphieuktra,
	suaphieuktra,
	xoaphieuktra,
} = require("~/controllers/phieukiemtra.controller");

const router = require("express").Router();

router.route("/").get(laytatcaphieuktra).post(lapphieuktra);
router
	.route("/:id")
	.get(laymotphieuktra)
	.put(suaphieuktra)
	.delete(xoaphieuktra);

module.exports = router;
