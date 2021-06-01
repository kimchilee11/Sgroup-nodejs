export class RegisterDto {
    /**
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} address 
     * @param {String} phonenumber 
     */

    constructor({email, password, address, phonenumber} )
    {
        this.email = email;
        this.password = password;
        this.address = address;
        this.phonenumber = phonenumber;
    }
}
