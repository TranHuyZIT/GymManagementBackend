const {
	dkypt,
	laytatcapt,
	capnhatpt,
	xoapt,
	laymotpt,
} = require("~/controllers/pt.controller");

const router = require("express").Router();

router.route("/").post(dkypt).get(laytatcapt);
router
	.route("/:id")
	.put(capnhatpt)
	.delete(xoapt)
	.get(laymotpt);
module.exports = router;
