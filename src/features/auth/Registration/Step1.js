import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from "react-input-mask";

import { PHONE_MASK } from "../../../constants";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LoopIcon from '@mui/icons-material/Loop';

import {
  sendSMS,
  selectFormData,
  selectErrors,
  setError,
  setErrors,
  selectLoading,
} from './../authSlice';

import styles from '../AuthForm.module.css';

export function Step1() {
  const dispatch = useDispatch();

  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const [phone, setPhone] = useState(formData.phone);
  const loading = useSelector(selectLoading);

  const handleChangePhone = (event) => {
    if (!!errors.phone) {
      dispatch(setError(["phone", ""]));
    }
    setPhone(event.target.value);
  };

  const handleSendSMS = () => {
    const phoneNumberArray = phone.match(/[0-9]/g) || [];
    const phoneMaskArray = PHONE_MASK.match(/[0-9]/g) || [];

    if (phoneNumberArray.length < phoneMaskArray.length || !phoneNumberArray.length) {
      dispatch(setError(["phone", "Заполните номер телефона"]));
    } else {
      dispatch(sendSMS(phone));
    }
  };

  useEffect(() => {
    dispatch(setErrors({}));
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={2}>
      <InputMask
        id="phone-number-mask"
        mask={PHONE_MASK}
        value={phone}
        onChange={handleChangePhone}
      >
        <TextField
          error={!!errors.phone}
          id="phone-number"
          label="Номер телефона"
          variant="outlined"
          helperText={errors.phone}
        />
      </InputMask>

      <Button
        variant="contained"
        onClick={handleSendSMS}
        disabled={loading}
        endIcon={!loading ? <ArrowCircleRightIcon/> : <LoopIcon className={styles.loadingIcon}/>}
      >
        Получить код по SMS
      </Button>
    </Stack>
  );
}
