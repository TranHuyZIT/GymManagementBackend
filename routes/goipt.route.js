const {
	laytatcagoipt,
	taogoipt,
	laymotgoipt,
	capnhatgoipt,
	xoagoipt,
} = require("~/controllers/goipt.controller");

const router = require("express").Router();
router.route("/").get(laytatcagoipt).post(taogoipt);
router
	.route("/:id")
	.get(laymotgoipt)
	.put(capnhatgoipt)
	.delete(xoagoipt);

module.exports = router;
