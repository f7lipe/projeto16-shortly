import joi from "joi";

const signupSchema = joi.object(
    {
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.string().required()
    }
)


const signinSchema = joi.object(
  {
    email: joi.string().email().required(),
    password: joi.string().required()
  }
)

export {signupSchema, signinSchema}