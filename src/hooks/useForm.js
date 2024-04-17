import { useState, useEffect } from "react";

 const useValidation = (formValue, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          formValue.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "maxLength":
          formValue.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmpty":
          formValue ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "emailRegEx":
          const regEx = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
          regEx.test(String(formValue).toLowerCase()) ? setEmailError(false) : setEmailError(true);
          break;
          default:
      }
    }
  }, [formValue]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid
  };
};

function useInput(inputValues, validations) {
  const [formValue, setFormValue] = useState(inputValues);
  // Сосотояние вышли или нет из инпута
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(formValue, validations);
  const handleChangeInput = (evt) => {
    setFormValue(evt.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    formValue,
    setFormValue,
    handleChangeInput,
    onBlur,
    isDirty,
    ...valid,
  };
}

export default useInput;