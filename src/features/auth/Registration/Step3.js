import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from "react-input-mask";

import { DATE_MASK } from "../../../constants";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LoopIcon from '@mui/icons-material/Loop';

import {
  selectRegistrationResult,
  selectFormData,
  selectErrors,
  selectLoading,
  setErrors,
  updateFormData,
  sendUserForm,
} from './../authSlice';

import { checkErrors } from './validation';

import styles from '../AuthForm.module.css';

export function Step3() {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const loading = useSelector(selectLoading);
  const registrationResult = useSelector(selectRegistrationResult);

  const handleChangeField = (event) => {
    const name = event.target.id;
    let value = event.target.value;

    if (event.target.type === "checkbox") {
      dispatch(updateFormData({
        [name]: event.target.checked,
      }));
    } else {
      dispatch(updateFormData({
        [name]: value.trim(),
      }));
    }
  };

  const handleConfirmUserForm = () => {
    const formErrors = checkErrors(formData, ["firstName", "lastName", "date", "email", "password", "password2", "agree"]);
    console.log(formErrors);
    dispatch(setErrors(formErrors));

    if (!Object.keys(formErrors).length) {
      dispatch(sendUserForm());
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        error={!!errors.lastName}
        id="lastName"
        label="Фамилия"
        variant="outlined"
        helperText={errors.lastName}
        value={formData.lastName}
        onChange={handleChangeField}
      />

      <TextField
        error={!!errors.firstName}
        id="firstName"
        label="Имя"
        variant="outlined"
        helperText={errors.firstName}
        value={formData.firstName}
        onChange={handleChangeField}
      />

      <InputMask
        id="date"
        mask={DATE_MASK}
        value={formData.date}
        onChange={handleChangeField}
      >
        <TextField
          error={!!errors.date}
          label="Дата рождения"
          variant="outlined"
          helperText={errors.date}
        />
      </InputMask>

      <TextField
        error={!!errors.email}
        id="email"
        label="Email"
        variant="outlined"
        helperText={errors.email}
        value={formData.email}
        onChange={handleChangeField}
      />

      <TextField
        error={!!errors.password}
        id="password"
        label="Придумайте пароль"
        variant="outlined"
        helperText={errors.password}
        value={formData.password}
        onChange={handleChangeField}
        type="password"
      />

      <TextField
        error={!!errors.password2}
        id="password2"
        label="Повторите пароль"
        variant="outlined"
        helperText={errors.password2}
        value={formData.password2}
        onChange={handleChangeField}
        type="password"
      />
      <FormControl
        error={!!errors.agree}>
        <FormControlLabel

          control={
            <Checkbox
              size="small"
              id="agree"
              checked={formData.agree}
              onChange={handleChangeField}
            />}
          label="Я соглашаюсь с политикой в отношении персональных данных"
        />
        <FormHelperText>{errors.agree}</FormHelperText>
      </FormControl>

      {registrationResult.error && <Alert severity="error">{registrationResult.error}</Alert>}
      {registrationResult.message && <Alert severity="success">{registrationResult.message}</Alert>}

      <Button
        variant="contained"
        onClick={handleConfirmUserForm}
        disabled={loading}
        endIcon={!loading ? <ArrowCircleRightIcon /> : <LoopIcon className={styles.loadingIcon} />}
      >
        Далее
      </Button>
    </Stack>
  );
}