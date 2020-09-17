import React, { useState } from 'react';
import { Form, FormInput } from '../Form/Form';

const ValidForm = ({ title, actionText, action, fields, validationDelay }) => {
  const fieldnames = Object.keys(fields);

  const [errorMessage, setErrorMessage] = useState('');
  
  const [values, setValues] = useState(
    fieldnames
      .reduce((vals, fieldname) => ({ ...vals,
        [fieldname]: ''
      }), {})
  );

  const [validation, setValidation] = useState(
    fieldnames
      .reduce((data, fieldname) => ({ ...data,
        [fieldname]: { valid: false, feedback: '' }
      }), {})
  );

  const [timeoutIds, setTimeoutIds] = useState(
    fieldnames
      .reduce((vals, fieldname) => ({ ...vals,
        [fieldname]: 0
      }), {})
  );

  const [abortControllers, setAbortControllers] = useState(
    fieldnames
      .reduce((controllers, fieldname) => ({ ...controllers,
        [fieldname]: undefined
      }), {})
  );

  const getValidationSetter = (fieldname) => (valid, feedback) => {
    setValidation({ ...validation,
      [fieldname]: { valid, feedback }
    });
    setTimeoutIds({ ...timeoutIds,
      [fieldname]: 0
    });
    setAbortControllers({ ...timeoutIds,
      [fieldname]: undefined
    });
  };

  const getValueSetter = (fieldname) => (value, validatorTimeoutId, abortController) => {
    setValues({ ...values,
      [fieldname]: value
    });
    setTimeoutIds({ ...timeoutIds,
      [fieldname]: validatorTimeoutId
    });
    setAbortControllers({ ...abortControllers,
      [fieldname]: abortController
    });
  };

  const getChangeHandler = (validator, valueSetter, validationSetter, timeoutId, abortController) => (e) => {
    const value = e.target.value;

    if(abortController)
      abortController.abort();

    abortController = new AbortController();

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      const [valid, feedback] = await validator(value, values, validation, abortController.signal);
      validationSetter(valid, feedback);
    }, validationDelay || 1000/5);

    valueSetter(value, timeoutId, abortController);
  };

  const fieldChangeHandlers = (
    fieldnames.reduce((handlers, fieldname) => ({ ...handlers,
      [fieldname]: (
        getChangeHandler(
          fields[fieldname].validation,
          getValueSetter(fieldname),
          getValidationSetter(fieldname),
          timeoutIds[fieldname],
          abortControllers[fieldname]
        )
      )
    }), {})
  );

  const checkValid = () => fieldnames.reduce((valid, fieldname) => valid && validation[fieldname].valid, true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkValid())
      action(values, setErrorMessage);
    else
      setErrorMessage('The form is not valid');
  };

  const renderField = (fieldname) => (
    <FormInput
      key={fieldname}
      name={fieldname}
      value={values[fieldname]}
      valid={validation[fieldname].valid}
      feedback={validation[fieldname].feedback}
      label={fields[fieldname].label}
      type={fields[fieldname].type}
      autoComplete={fields[fieldname].autoComplete}
      handleChange={fieldChangeHandlers[fieldname]}
    />
  );

  return (
    <Form
      title={title}
      actionText={actionText}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      {fieldnames.map(renderField)}
    </Form>
  );
};

export default ValidForm;