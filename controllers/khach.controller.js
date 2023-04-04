const KhachModel = require("~/models/khach.model").model;
class KhachController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dky(req, res) {
		try {
			const newKhach = new KhachModel({
				...req.body,
				dkytap: [],
				dkypt: [],
			});
			const khachRecord = await newKhach.save();
			return res.status(200).json(khachRecord);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymot(req, res) {
		try {
			const id = req.params.id;
			const khach = await KhachModel.findById(
				id
			).sort([]);
			const dkytap = khach.dkytap.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			const dkypt = khach.dkypt.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			return res.status(200).json({
				...khach.toJSON(),
				dkypt,
				dkytap,
				ngayHetHanTap: dkytap[0].ngayhethan,
				ngayHetHanPT: dkypt[0].ngayhethan,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatca(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const term = req.query.term || null;
			const searchBy = req.query.searchBy || null;
			const filter = {};
			if (term) {
				filter[searchBy] = {
					$regex: term,
					$options: "i",
				};
			}
			const allKhachs = await KhachModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = await KhachModel.count(
				filter
			);
			return res.status(200).json({
				totalRows,
				data: allKhachs,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoa(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
				{
					_id: id,
				},
				{
					isDeleted: true,
				}
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async capnhat(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
				{
					_id: id,
				},
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new KhachController();
