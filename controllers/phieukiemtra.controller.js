const { default: mongoose } = require("mongoose");
const NhanVienModel =
	require("~/models/nhanvien.model").model;
const PhieuKiemTraModel =
	require("~/models/phieukiemtra.model").model;
const ThietBiPhongModel =
	require("~/models/thietbiphong.model").model;
class PhieuKiemTraController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaphieuktra(req, res) {
		try {
			const allLichs = await PhieuKiemTraModel.find();
			return res.status(200).json(allLichs);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async lapphieuktra(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const { manv, chitiet, ...rest } = req.body;
			const nhanvien = await NhanVienModel.findById(
				manv
			);
			console.log(rest);
			if (!nhanvien)
				throw new Error(
					"Không tìm thấy nhân viên với mã" + manv
				);
			const updatedThietBiPhongs = [];
			for (const ct of chitiet) {
				const { mathietbiphong, ...extraInfo } = ct;
				const updated =
					await ThietBiPhongModel.findByIdAndUpdate(
						mathietbiphong,
						{ ...extraInfo },
						{ session, new: true }
					);
				updatedThietBiPhongs.push({
					thietbiphong: updated,
					tinhtrang: updated.tinhtrang,
				});
			}
			const newPhieuKtra = new PhieuKiemTraModel({
				...rest,
				nhanvien,
				chitiet: updatedThietBiPhongs,
			});
			const newRecord = await newPhieuKtra.save({
				session,
			});
			await session.commitTransaction();
			return res.status(200).json(newRecord);
		} catch (error) {
			await session.abortTransaction();
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async suaphieuktra(req, res) {
		try {
			const id = req.params.id;
			const result =
				await PhieuKiemTraModel.updateOne(
					{ _id: id },
					req.body
				);
			return res.status(200).json(result);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoaphieuktra(req, res) {
		try {
			const id = req.params.id;
			const result =
				await PhieuKiemTraModel.deleteOne({
					_id: id,
				});
			return res.status(200).json(result);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymotphieuktra(req, res) {
		try {
			const id = req.params.id;
			const lichhd = await PhieuKiemTraModel.findById(
				id
			);
			return res.status(200).json(lichhd);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new PhieuKiemTraController();
