
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const checkErrors = (formData, notEmptyFields) => {
  const errors = {};

  const {
    firstName,
    lastName,
    date,
    email,
    password,
    password2,
    agree,
  } = formData;

  // check on empty string
  Object.keys(formData).forEach(key => {
    if (notEmptyFields.includes(key) && !formData[key]) {
      errors[key] = "Обязательно заполните это поле";
    }
  });

  // lastName
  if (lastName && !/^[\u0400-\u04FF]+(-[\u0400-\u04FF]+)?$/.test(lastName)) {
    errors["lastName"] = "Введите фамилию одним словом ими через дефис. Не используйте цифры и специальные символы";
  }

  // firstName
  if (firstName && !/^[\u0400-\u04FF]+(-[\u0400-\u04FF]+)?$/.test(firstName)) {
    errors["firstName"] = "Введите имя одним словом ими через дефис. Не используйте цифры и специальные символы";
  }

  // date
  let dateArr = date.split(".");

  if (date.includes("_") || dateArr[0] > 31 || dateArr[1] > 12 || dateArr[2] < 1900 || dateArr[2] > 2022) {
    errors["date"] = "Введите корректную дату";
  } else {
    if (2022 - dateArr[2] <= 15) {
      errors["date"] = "Для регистрации вы должны быть не младше 16 лет";
    }
  }

  // email
  if (email && !validateEmail(email)) {
    errors["email"] = "Введите корректный email";
  }

  // password
  if (password.length < 6) {
    errors["password"] = "Пароль должен содержать не менее 6 символов";
  }

  // password2
  if (password !== password2) {
    errors["password2"] = "Введённые пароли не совпадают";
  }

  // agree
  if (!agree) {
    errors["agree"] = "Ознакомьтесь и примите соглашение и документы, чтобы продолжить";
  }

  return errors;
}

