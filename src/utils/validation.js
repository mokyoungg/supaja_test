export const checkPassword = (value) => {
  const password = value;
  // 최소 8자, 최대 16자. 숫자,문자,특수문자 포함
  const check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  if (check.test(password) === false) {
    return false;
  }
  return true;
};

export const checkPhoneNumber = (value) => {
  const phoneNum = value;
  const check = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  if (check.test(phoneNum) === false) {
    return false;
  }
  return true;
};

export const checkEmail = (value) => {
  const email = value;
  const check = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (check.test(email) === false) {
    return false;
  }
  return true;
};
