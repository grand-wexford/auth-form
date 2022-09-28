import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LoopIcon from '@mui/icons-material/Loop';

import {
  selectFormData,
  selectLoading,
  selectErrors,
  selectLoginResult,
  setErrors,
  updateFormData,
  sendLoginForm,
  resetLoginResult,
} from './../authSlice';

import { checkErrors } from './validation';

import styles from '../AuthForm.module.css';

export function Auth() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const loginResult = useSelector(selectLoginResult);

  const handleLogin = () => {
    const formErrors = checkErrors(formData);

    dispatch(setErrors(formErrors));

    if (!Object.keys(formErrors).length) {
      dispatch(resetLoginResult());
      dispatch(sendLoginForm());
    }
  };

  const handleChangeField = (event) => {
    const name = event.target.id;
    let value = event.target.value;

    dispatch(updateFormData({
      [name]: value.trim(),
    }));
  };

  useEffect(() => {
    dispatch(setErrors({}));
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        error={!!errors.emailPhone}
        id="emailPhone"
        label="Email или Номер телефона"
        variant="outlined"
        helperText={errors.emailPhone}
        value={formData.emailPhone}
        onChange={handleChangeField}
      />
      <TextField
        error={!!errors.password}
        id="password"
        label="Пароль"
        variant="outlined"
        helperText={errors.password}
        value={formData.password}
        onChange={handleChangeField}
        type="password"
      />

      {loginResult.error && <Alert severity="error">{loginResult.error}</Alert>}
      {loginResult.message && <Alert severity="success">{loginResult.message}</Alert>}


      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        endIcon={!loading ? <ArrowCircleRightIcon /> : <LoopIcon className={styles.loadingIcon} />}
      >
        Войти
      </Button>
    </Stack>
  );
}
