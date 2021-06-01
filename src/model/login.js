import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

var LoginSchema = new Schema({
        email: String,
        password: String,
        address: String,
        phonenumber: String,
    });

// LoginSchema.pre('save', function() {
//   return new Promise((resolve, reject) => {
//     reject(new Error('something went wrong'));
//   });
// });
// LoginSchema.pre('save',async function (next){
//     try{
//         const salt = await bcrypt.genSalt(10);
//         const pwdHashed = await bcrypt.hash(this.password, salt);
//         this.password = pwdHashed;
//         console.log('pwdHashed');
//     }
//     catch(err){
//         next(err);
//     }
// })


const LoginModel = model('login', LoginSchema);
export default LoginModel ;