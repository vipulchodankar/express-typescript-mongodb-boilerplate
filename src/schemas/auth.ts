import * as yup from "yup";

const authSchema = {
  register: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
  login: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
};

export default authSchema;
