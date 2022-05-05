import * as yup from "yup";

const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/;

export const schema = yup.object({
    name: yup
        .string()
        .min(2, 'Username should contain 2-60 characters')
        .max(60, 'Username should contain 2-60 characters')
        .required(),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Number should start with code of Ukraine +380')
        .required(),
    email: yup
        .string()
        .min(2, 'Email should contain 2-100 characters')
        .max(100, 'Email should contain 2-100 characters')
        .email()
        .required(),
    position_id: yup
        .number()
        .required(),
    photo: yup
        .mixed()
        .required()
        .test('fileSize', 'The photo size must not be greater than 5 Mb', val => {
            return val && val.size <= 5000000;
        })
        .test('type', 'The photo format must be jpeg/jpg type', val => {
            return val && val.type === 'image/jpeg';
        }),
}).required();
