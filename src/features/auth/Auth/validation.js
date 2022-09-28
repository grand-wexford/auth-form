export const checkErrors = (formData) => {
  const errors = {};

  // check on empty string
  Object.keys(formData).forEach(key => {
    if (!formData[key]) {
      if(["password","emailPhone"].includes(key)){
        errors[key] = "Обязательно заполните это поле";
      }
    }
  });

  return errors;
}

