const ThietBiPhongModel =
	require("~/models/thietbiphong.model").model;
class ThietBiPhong {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laytatcatbp(req, res) {
		try {
			const offset = req.query.offset;
			const pageSize = req.query.pageSize;
			const allThietBiPhong =
				await ThietBiPhongModel.find({}, "", {
					skip: offset,
					limit: pageSize,
				});
			const total = await ThietBiPhongModel.count({});
			console.log(allThietBiPhong);
			return res.status(200).json({
				data: allThietBiPhong,
				totalRows: total,
			});
		} catch (error) {
			res.send({ msg: error.message });
		}
	}
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laymottbp(req, res) {
		try {
			const id = req.params.id;
			const thietbiphong =
				await ThietBiPhongModel.findById(id);
			return res.status(200).json(thietbiphong);
		} catch (error) {
			res.send({ msg: error.message });
		}
	}
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async xoamottbp(req, res) {
		try {
			const id = req.params.id;
			const result =
				await ThietBiPhongModel.findByIdAndDelete(
					id
				);
			return res.status(200).json(result);
		} catch (error) {
			res.send({ msg: error.message });
		}
	}
}

module.exports = new ThietBiPhong();
