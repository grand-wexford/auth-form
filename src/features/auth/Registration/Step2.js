import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from "react-input-mask";

import { CODE_MASK } from "../../../constants";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LoopIcon from '@mui/icons-material/Loop';

import {
  sendCode,
  selectFormData,
  selectErrors,
  setError,
  selectLoading,
} from './../authSlice';

import styles from '../AuthForm.module.css';

export function Step2() {
  const dispatch = useDispatch();

  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const [code, setCode] = useState(formData.code);
  const loading = useSelector(selectLoading);

  const handleChangeCode = (event) => {
    if (!!errors.code) {
      dispatch(setError(["code", ""]));
    }
    setCode(event.target.value);
  };

  const handleConfirmCode = () => {
    const codeNumberArray = code.match(/[0-9]/g) || [];
    const codeMaskArray = CODE_MASK.match(/[0-9]/g) || [];

    if (codeNumberArray.length < codeMaskArray.length || !codeNumberArray.length) {
      dispatch(setError(["code", "Введите код"]));
    } else {
      dispatch(sendCode(code));
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <InputMask
        id="code-number-mask"
        mask={CODE_MASK}
        value={code}
        onChange={handleChangeCode}
      >
        <TextField
          error={!!errors.code}
          id="code-number"
          label="Код"
          variant="outlined"
          helperText={errors.code}
        />
      </InputMask>

      <Button
        variant="contained"
        onClick={handleConfirmCode}
        disabled={loading}
        endIcon={!loading ? <ArrowCircleRightIcon /> : <LoopIcon className={styles.loadingIcon} />}
      >
        Далее
      </Button>
    </Stack>
  );
}
