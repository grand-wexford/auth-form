import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSendSMS, fetchSendCode, fetchUserForm, fetchLoginForm } from "./authAPI";

const initialState = {
  status: "idle",
  actionName: "registration",
  loading: false,
  tab: 1,
  registrationResult: {},
  loginResult: {},
  formData: {
    phone: "", // 375299132683
    code: "", // 456 854
    lastName: "",
    firstName: "",
    date: "",
    email: "",
    emailPhone: "",
    password: "",
    password2: "",
    agree: false,
  },
  errors: {},
};

export const sendSMS = createAsyncThunk(
  "auth/fetchSendSMS",
  async (phone, { dispatch }) => {
    dispatch(updatePhone(phone));

    const response = await fetchSendSMS(phone);
    return response.data;
  }
);

export const sendCode = createAsyncThunk(
  "auth/fetchSendCode",
  async (code, { dispatch, getState }) => {

    const { auth } = getState();
    const phone = auth.formData.phone;
    dispatch(updateCode(code));

    const response = await fetchSendCode(code, phone);
    return response.data;
  }
);

export const sendUserForm = createAsyncThunk(
  "auth/fetchSendUserForm",
  async (_, { getState }) => {

    const { auth } = getState();
    const formData = auth.formData;
    const response = await fetchUserForm(formData);
    return response.data;
  }
);

export const sendLoginForm = createAsyncThunk(
  "auth/fetchSendLoginForm",
  async (_, { getState }) => {

    const { auth } = getState();
    const formData = auth.formData;
    const response = await fetchLoginForm(formData);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePhone: (state, action) => {
      state.formData.phone = action.payload;
    },

    updateCode: (state, action) => {
      state.formData.code = action.payload;
    },

    changeTab: (state, action) => {
      state.tab = action.payload;
    },

    setError: (state, action) => {
      const [actionName, message] = action.payload;

      state.errors[actionName] = message;
    },

    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },

    updateErrors: (state, action) => {
      state.errors = {
        ...state.errors,
        ...action.payload,
      };
    },

    resetRegistrationResult: (state) => {
      state.registrationResult = {};
    },

    resetLoginResult: (state) => {
      state.loginResult = {};
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },

    setActionName: (state, action) => {
      state.actionName = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendSMS.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(sendSMS.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.actionName = "confirm";
      })
      .addCase(sendSMS.rejected, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.errors.phone = action.error.message;
      })
      .addCase(sendCode.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(sendCode.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
        state.actionName = "userForm";
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.errors.code = action.error.message;
        state.actionName = "userForm"; // remove this
      })
      .addCase(sendUserForm.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(sendUserForm.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.registrationResult = action.payload;
      })
      .addCase(sendUserForm.rejected, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.registrationResult = action.payload;
      })
      .addCase(sendLoginForm.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(sendLoginForm.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.loginResult = action.payload;
      })
      .addCase(sendLoginForm.rejected, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.loginResult = action.payload;
      });
  },
});

export const {
  updatePhone,
  updateCode,
  updateErrors,
  updateFormData,
  setError,
  setErrors,
  setActionName,
  changeTab,
  resetLoginResult,
  resetRegistrationResult,
} = counterSlice.actions;

export const selectFormData = (state) => state.auth.formData;
export const selectErrors = (state) => state.auth.errors;
export const selectActionName = (state) => state.auth.actionName;
export const selectLoading = (state) => state.auth.loading;
export const selectTab = (state) => state.auth.tab;
export const selectRegistrationResult = (state) => state.auth.registrationResult;
export const selectLoginResult = (state) => state.auth.loginResult;

export default counterSlice.reducer;
