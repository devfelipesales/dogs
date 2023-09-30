const validation = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido',
  },
  cep: {
    regex: /^\d{5}-?\d{3}$/,
    message: 'Preencha um CEP válido',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números',
  },
};

const Validate = (value, type) => {
  const validate = {
    error: false,
    message: '',
  };

  if (value.length === 0) {
    validate.error = true;
    validate.message = 'Preencha um valor';
    return validate;
    // Verifica se o type passado existe no objeto e se não passou no teste do regex
  } else if (validation[type] && !validation[type].regex.test(value)) {
    validate.error = true;
    validate.message = validation[type].message;
    return validate;
  } else {
    validate.error = false;
    validate.message = '';
    return validate;
  }
};

export default Validate;
