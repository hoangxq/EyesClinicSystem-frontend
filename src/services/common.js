import { Validate } from "src/configs";

export const checkPhoneNumber = (_, value) => {
  if (value) {
    let regex_phone = new RegExp(Validate.REGEX_PHONE);
    if (regex_phone.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Please enter a valid phone number!'));
    }
  } else {
    return Promise.reject(new Error('Please input a phone number!'));
  }
};