import joi from 'joi'

const schema = joi.object({
    email: String.min(5).require(),
    password: String.min(5).require(),
    
})