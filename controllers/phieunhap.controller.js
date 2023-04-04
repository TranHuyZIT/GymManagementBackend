const PhieuNhapModel =
	require("~/models/phieunhap.model").model;
const NhanVienModel =
	require("~/models/nhanvien.model").model;
const ThietBiModel =
	require("~/models/thietbi.model").model;
const ThietBiPhongModel =
	require("~/models/thietbiphong.model").model;
const mongoose = require("mongoose");
class PhieuNhapController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaphieunhap(req, res) {
		try {
			const offset = req.query.offset;
			const pageSize = req.query.pageSize;
			const allPhieuNhaps = await PhieuNhapModel.find(
				{},
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const total = await PhieuNhapModel.count({});
			return res.status(200).json({
				data: allPhieuNhaps,
				total,
			});
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
	async lapphieunhap(req, res) {
		console.log(req.body);
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const { manv, chitiet, ...phieunhapInfo } =
				req.body;

			const nhanvien = await NhanVienModel.findOne({
				id: manv,
			});
			if (!nhanvien)
				throw new Error(
					"Không tồn tại nhân viên với mã " + manv
				);
			const newPhieuNhap = new PhieuNhapModel({
				...phieunhapInfo,
			});
			const newRecord = await newPhieuNhap.save({
				session,
			});
			const createdChiTiets = [];
			let tongtien = 0;
			let tongsl = 0;
			for (const ctpn of chitiet) {
				const { matb, ...chitietInfo } = ctpn;
				const thietbi = await ThietBiModel.findById(
					matb
				).session(session);
				if (!thietbi)
					throw new Error(
						"Không tồn tại thiết bị với mã" +
							matb
					);
				const tbphong = new ThietBiPhongModel({
					...chitietInfo,
					ten: chitietInfo.ten || thietbi.ten,
					phieunhap: newPhieuNhap,
					thietbi,
					tinhtrang:
						chitietInfo.tinhtrang || "Tốt",
				});
				const newThietBiPhong = await tbphong.save({
					session,
				});
				tongtien += newThietBiPhong.gianhap;
				tongsl++;
				createdChiTiets.push({
					thietbiphong: newThietBiPhong,
					gianhap: newThietBiPhong.gianhap,
				});
			}
			const phieunhap =
				await PhieuNhapModel.findOneAndUpdate(
					{ _id: newRecord._id },
					{
						nhanvien,
						tongtien,
						tongsl,
						chitiet: createdChiTiets,
					},
					{
						session,
						new: true,
					}
				);
			await session.commitTransaction();
			return res.status(200).json(phieunhap);
		} catch (error) {
			await session.abortTransaction();
			res.status(500).send({
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
	async suaphieunhap(req, res) {
		try {
			const id = req.params.id;
			const result = await PhieuNhapModel.updateOne(
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
	async xoaphieunhap(req, res) {
		try {
			const id = req.params.id;
			const result = await PhieuNhapModel.deleteOne({
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
	async laymotphieunhap(req, res) {
		try {
			const id = req.params.id;
			const lichhd = await PhieuNhapModel.findById(
				id
			);
			return res.status(200).json(lichhd);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new PhieuNhapController();
