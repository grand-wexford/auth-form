
import { API_KEY } from "../../constants";
// A mock function to mimic making an async request for data
// export function fetchSendSMS(phone) {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve({ data: 1 }), 500)
//   );
// }



export function fetchSendSMS(phone) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://portal.silverscreen.by:8445/wschecktest/check/command?type=0",
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          auth: API_KEY,
        },
        body: JSON.stringify({
          command: "REGISTRATION_NOTIFY_PHONE",
          checkInfo: {
            searchValue: phone.match(/[0-9]/g).join(""),
          },
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 400) {
          reject(data);
        } else {
          resolve({ data: data });
        }
      })
      .catch(error => console.log(error))
  }
  );
}

export function fetchSendCode(code, phone = "") {
  return new Promise((resolve, reject) => {
    fetch(
      "https://portal.silverscreen.by:8445/wschecktest/check/command?type=0",
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          auth: API_KEY,
        },
        body: JSON.stringify({
          command: "REGISTRATION_CONFIRM_PHONE",
          checkInfo: {
            searchValue: phone.match(/[0-9]/g).join(""),
            searchValue2: code.match(/[0-9]/g).join(""),
          },
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 400) {
          reject(data);
        } else {
          resolve({ data: data });
        }
      })
      .catch(error => console.log(error))
  }
  );
}

export function fetchUserForm(formData) {
  const { phone, date, password2, agree, emailPhone, ...userData } = formData;

  return new Promise((resolve, reject) => {
    fetch(
      "https://tsoft.silverscreen.by:8443/wssite/webapi/registration",
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          type: 0
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 400) {
          reject(data);
        } else {
          resolve({ data: data });
        }
      })
      .catch(error => console.log(error))
  }
  );
}

export function fetchLoginForm(formData) {

  return new Promise((resolve, reject) => {
    fetch(
      "https://tsoft.silverscreen.by:8443/wssite/webapi/token/create",
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": formData.emailPhone,
          "password": formData.password
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 400) {
          reject(data);
        } else {
          resolve({ data: data });
        }
      })
      .catch(error => console.log(error))
  }
  );
}