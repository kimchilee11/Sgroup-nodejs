import jwt from 'jsonwebtoken'
// import { LoginModel } from '../../../model/login'
import { JWT_SECRET } from '../../../env'
import { RegisterDto } from "../dto/index";
import LoginModel from '../../../model/login';
import bcrypt from 'bcryptjs';

class ServiceAuth {
    async login ({ email, password}) {
        let data =await LoginModel.findOne({
            email : email,
        })
        let x= await bcrypt.compare(password, data.password);
        if(x) {
            var token= jwt.sign({
                id : data._id
            }, JWT_SECRET)
            return token;
        }
        return 400;
    }

    async register (data) {
        const dto = new RegisterDto(data);
        const salt = await bcrypt.genSalt(10);
        dto.password = await bcrypt.hash(dto.password, salt);
        let arr = await LoginModel.find(x => x);
        let str = String(dto.email);
        let loop=0;
        arr.forEach(e => {
            if( str.indexOf(String(e.email)) ){
                loop=1;
            }
        });
        if(loop==0) await LoginModel.insertMany([dto]);
        return 'ok';
    }
}

export const Service = new ServiceAuth();
