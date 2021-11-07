const { TaiKhoan } = require('../models');
const TaiKhoanService = require('../services/TaiKhoan');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.APP_SALT_ROUNDS) || 10;
const {generateID}=require('../helpers/generateID')
const {successResponse,errorResponse}= require('../utils/objResponse');

exports.register = async (req, res) => {
    try{
        const input = req.body;
    
        if(!input) 
        return res.status(400).json(errorResponse("Không tìm thấy dữ liệu"))
        const checkUsername = await TaiKhoanService.findOne({tenTaiKhoan:input.tenTaiKhoan});
        const checkEmail = await TaiKhoanService.findOne({email:input.email});
    
        if(checkUsername)
            return res.status(400).json(errorResponse("Existed username"))
    
        if(checkEmail)
            return res.status(400).json(errorResponse("Existed email"))
    
        let password = await bcrypt.hash(input.matKhau, saltRounds);
        maTaiKhoan=generateID("TK");
    
        const newUser = new TaiKhoan({
            ...input,
            maTaiKhoan:maTaiKhoan,
            matKhau:password,
            quyenHan: 0
        });
    
    
        await newUser.save();
        return res.status(200).json(successResponse("Đăng kí tài khoản thành công"));
    }catch(e){
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    
}
