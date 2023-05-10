const {
	dkypt,
	laytatcapt,
	capnhatpt,
	xoapt,
	laymotpt,
	laythongtinprofile,
} = require("~/controllers/pt.controller");

const router = require("express").Router();

router.route("/").post(dkypt).get(laytatcapt);
router.route("/self").get(laythongtinprofile);
router
	.route("/:id")
	.put(capnhatpt)
	.delete(xoapt)
	.get(laymotpt);
module.exports = router;
