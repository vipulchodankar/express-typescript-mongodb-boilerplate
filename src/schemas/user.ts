import * as yup from "yup";

const userSchema = {
  update: yup.object().shape({
    name: yup.string().notRequired(),
  }),
};

export default userSchema;
