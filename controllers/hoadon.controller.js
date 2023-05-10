const { default: mongoose } = require("mongoose");
const { addDays } = require("~/utils/common.util");

const KhachModel = require("~/models/khach.model").model;
const NhanVienModel =
	require("~/models/nhanvien.model").model;
const HoaDonModel = require("~/models/hoadon.model").model;
const DkyTapModel = require("~/models/dkytap.model").model;
const DkyPTModel = require("~/models/dkypt.model").model;
const GoiTapModel = require("~/models/goitap.model").model;
const GoiPTModel = require("~/models/goipt.model").model;
const KhuyenMaiModel =
	require("~/models/khuyenmai.model").model;
const ThongKeLogModel =
	require("~/models/thongkelog.model").model;
class HoaDonController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async duyetHoaDon(req, res) {
		const session = await mongoose.startSession();
		try {
			const currentUser = req.currentUser;
			if (!currentUser)
				res.status(401).send({
					message: "Vui lòng đăng nhập lại",
				});
			const nhanvien = await NhanVienModel.findOne({
				user: currentUser._id,
			}).then((data) => data.toJSON());
			if (!nhanvien)
				throw new Error(
					"Không tồn tại nhân viên này"
				);
			session.startTransaction();
			const mahoadon = req.params.id;
			let hoadon = await HoaDonModel.findById(
				mahoadon
			);
			if (!hoadon)
				throw new Error(
					"Không tồn tại hóa đơn này"
				);
			hoadon = hoadon.toJSON();
			if (hoadon.isChecked)
				throw new Error(
					"Hóa đơn này đã được duyệt trước đó!"
				);
			for (const dkytap of hoadon.dkytap) {
				await DkyTapModel.findOneAndUpdate(
					{ _id: dkytap._id },
					{ ...dkytap, isChecked: true }
				).session(session);
				await KhachModel.updateOne(
					{
						id: hoadon.khach.id,
						"dkytap._id": dkytap._id,
					},
					{
						$set: {
							"dkytap.$.isChecked": true,
						},
					}
				).session(session);
				await HoaDonModel.updateOne(
					{
						_id: hoadon._id,
						"dkytap._id": dkytap._id,
					},
					{
						$set: {
							"dkytap.$.isChecked": true,
						},
					}
				).session(session);
			}
			console.log(hoadon);
			for (const dkypt of hoadon.dkypt) {
				await DkyPTModel.findOneAndUpdate(
					{ _id: dkypt._id },
					{ ...dkypt, isChecked: true }
				).session(session);
				await KhachModel.updateOne(
					{
						id: hoadon.khach.id,
						"dkypt._id": dkypt._id,
					},
					{ $set: { "dkypt.$.isChecked": true } }
				).session(session);
				await HoaDonModel.updateOne(
					{
						_id: hoadon._id,
						"dkypt._id": dkypt._id,
					},
					{ $set: { "dkypt.$.isChecked": true } }
				).session(session);
			}
			await HoaDonModel.updateOne(
				{
					_id: hoadon._id,
				},
				{ isChecked: true, manv: nhanvien._id }
			).session(session);
			hoadon = await HoaDonModel.findById(
				mahoadon
			).session(session);
			console.log(hoadon);
			await session.commitTransaction();
			return res.status(200).json(hoadon);
		} catch (error) {
			await session.abortTransaction();
			res.status(500).send({
				message: error.message,
			});
		}
		await session.endSession();
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async taohoadonKhach(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const currentUser = req.currentUser;

			const { dkytap, dkypt, khuyenmai, ...info } =
				req.body;
			console.log(currentUser);
			const khach = await KhachModel.findOne({
				user: currentUser._id,
			}).session(session);
			if (!khach)
				throw new Error(
					"Không tìm thấy khách hàng với mã " +
						currentUser._id
				);
			let tongtien = 0;
			const dkyTapRecords = [];
			for (const dky of dkytap) {
				const { magoitap, ...dkyInfo } = dky;
				const ngaydk = new Date();
				const goitap = await GoiTapModel.findById(
					magoitap
				);
				if (!goitap)
					throw new Error(
						"Không tìm thấy gói tập với mã " +
							magoitap
					);
				tongtien += goitap.gia;
				const ngayhethan = addDays(
					ngaydk,
					goitap.songay
				);
				const newDky = new DkyTapModel({
					makhach: khach._id,
					...dkyInfo,
					goitap,
					ngaydk,
					ngayhethan: ngayhethan,
					isChecked: false,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				dkyTapRecords.push(newDkyRecord);
				khach.dkytap.push(newDkyRecord);
			}
			const dkyPTRecords = [];
			for (const dky of dkypt) {
				const { magoipt, ...dkyInfo } = dky;
				const ngaydk = new Date();

				const goipt = await GoiPTModel.findById(
					magoipt
				);
				if (!goipt)
					throw new Error(
						"Không tồn tại gói pt với mã " +
							magoipt
					);
				const ngayhethan = addDays(
					ngaydk,
					goipt.songay
				);
				const newDky = new DkyPTModel({
					makhach: khach._id,
					...dkyInfo,
					ngaydk,
					goipt,
					ngayhethan,
					isChecked: false,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				tongtien += goipt.gia;
				dkyPTRecords.push(newDkyRecord);
				khach.dkypt.push(newDkyRecord);
			}
			let khuyenmaiRecord = null;
			if (khuyenmai) {
				khuyenmaiRecord =
					await KhuyenMaiModel.findById(
						khuyenmai
					);
				tongtien -= tongtien * khuyenmaiRecord.tile;
			}
			const newHoaDon = new HoaDonModel(
				{
					manv: null,
					khach,
					info,
					dkytap: dkyTapRecords,
					dkypt: dkyPTRecords,
					khuyenmai: khuyenmaiRecord,
					tongtien,
					ngaylap: info.ngaylap,
					isChecked: false,
				},
				{
					session,
				}
			);
			await newHoaDon.save({ session });
			await khach.save({ session });

			await session.commitTransaction();
			return res.status(200).json(newHoaDon);
		} catch (error) {
			await session.abortTransaction();
			res.status(500).send({
				message: error.message,
			});
		}
		await session.endSession();
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async taohoadon(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const currentUser = req.currentUser;
			const nhanvien = await NhanVienModel.findOne({
				user: currentUser._id,
			});
			if (!nhanvien)
				throw new Error("Vui lòng đăng nhập lại");
			console.log(nhanvien);
			const {
				dkytap,
				dkypt,
				makhach,
				khuyenmai,
				...info
			} = req.body;
			const khach = await KhachModel.findById(
				makhach
			).session(session);
			if (!khach)
				throw new Error(
					"Không tìm thấy khách hàng với mã " +
						makhach
				);
			let tongtien = 0;
			const dkyTapRecords = [];
			for (const dky of dkytap) {
				const { magoitap, ...dkyInfo } = dky;
				const goitap = await GoiTapModel.findById(
					magoitap
				);
				if (!goitap)
					throw new Error(
						"Không tìm thấy gói tập với mã " +
							magoitap
					);
				tongtien += goitap.gia;
				const ngayhethan = addDays(
					dky.ngaydk,
					goitap.songay
				);
				const newDky = new DkyTapModel({
					makhach: khach._id,
					...dkyInfo,
					goitap,
					ngayhethan: ngayhethan,
					isChecked: true,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				dkyTapRecords.push(newDkyRecord);
				khach.dkytap.push(newDkyRecord);
			}
			const dkyPTRecords = [];
			for (const dky of dkypt) {
				const { magoipt, ...dkyInfo } = dky;
				const goipt = await GoiPTModel.findById(
					magoipt
				);
				if (!goipt)
					throw new Error(
						"Không tồn tại gói pt với mã " +
							magoipt
					);
				const ngayhethan = addDays(
					dky.ngaydk,
					goipt.songay
				);
				const newDky = new DkyPTModel({
					makhach: khach._id,
					...dkyInfo,
					goipt,
					ngayhethan,
					isChecked: true,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				tongtien += goipt.gia;
				dkyPTRecords.push(newDkyRecord);
				khach.dkypt.push(newDkyRecord);
			}
			let khuyenmaiRecord = null;
			if (khuyenmai) {
				khuyenmaiRecord =
					await KhuyenMaiModel.findById(
						khuyenmai
					);
				tongtien -= tongtien * khuyenmaiRecord.tile;
			}
			const newHoaDon = new HoaDonModel(
				{
					manv: nhanvien._id,
					khach,
					info,
					dkytap: dkyTapRecords,
					dkypt: dkyPTRecords,
					khuyenmai: khuyenmaiRecord,
					tongtien,
					ngaylap: info.ngaylap,
					isChecked: true,
				},
				{
					session,
				}
			);
			await newHoaDon.save({ session });
			const thongkeLog = new ThongKeLogModel({
				nhanvien,
				tien: tongtien,
				loai: true,
			});
			await thongkeLog.save({ session });
			await khach.save({
				session,
			});

			await session.commitTransaction();
			return res.status(200).json(newHoaDon);
		} catch (error) {
			await session.abortTransaction();
			res.send({
				message: error.message,
			});
		}
		await session.endSession();
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laytatcahoadon(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const tenKhach = req.query.name || null;
			const checked = req.query.checked || null;
			let where = {};
			if (tenKhach) {
				where["khach.ten"] = {
					$regex: tenKhach,
					$options: "i",
				};
			}
			switch (checked) {
				case null:
					where["isChecked"] = false;
					break;
				default:
					where["isChecked"] = true;
					break;
			}
			console.log(where);
			const allHoaDons = await HoaDonModel.find(
				where,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			)
				.select("-khach.dkytap -khach.dkypt")
				.populate("manv");
			const totalRows = await HoaDonModel.count(
				where
			);
			return res.status(200).json({
				data: allHoaDons,
				totalRows,
			});
		} catch (error) {
			console.log(error);
			res.status(400).send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laymothoadon(req, res) {
		try {
			const id = req.params.id;
			const hoadon = await HoaDonModel.findById(id);
			return res.status(200).json(hoadon);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async xoamothoadon(req, res) {
		try {
			const id = req.params.id;
			const result = await HoaDonModel.deleteOne({
				_id: id,
			});
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async luuhoadon(req, res) {
		try {
			return res.status(200).json();
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
}

module.exports = new HoaDonController();
