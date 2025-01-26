import { model, Schema } from "mongoose";

const authenticationSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return /@gmail\.com$/.test(value);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true },
  createdAt: { type: String, default: new Date().toLocaleDateString() },
});

const authenticationModel = model("Authentication", authenticationSchema);

export default authenticationModel;
