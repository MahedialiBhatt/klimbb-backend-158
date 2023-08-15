import Joi from "joi";

// TODO: add validations to address
const addTransactionSchema = Joi.object({
  fromAddress: Joi.string().required(),
  toAddress: Joi.string().required().disallow(Joi.ref("fromAddress")),
  amount: Joi.number()
    .min(10)
    .max(10 ** 6)
    .required(),
});

export { addTransactionSchema };
