import { Service } from '../service'

class Controller {
    /**
     * @type {Service}
     */
    service;
    constructor(service) {
        this.service = service
    }
    login =  async (req,res) => {
        try {
            var token = await this.service.login(req.body);
            if(token != 400) {
                res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                return res.status(200).send({
                    message: token
                })
            }
            return res.status(500).send({
                message: "ERROR !!!"
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    register = async (req, res) => {
        try {
            var state = await this.service.register(req.body);
            res.send(state);
        } catch (error) {
            console.log(error);
        }
    }

}

export const ControllerAuth = new Controller(Service);
