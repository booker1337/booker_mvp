import React, { useState } from 'react';
import { Form, FormInput } from '../Form/Form';

const ValidForm = ({ title, actionText, action, fields }) => {
  const fieldnames = Object.keys(fields);
  
  const [formData, setFormData] = useState(
    fieldnames
      .reduce((data, fieldname) => ({ ...data,
        [fieldname]: { value: '', valid: true, feedback: '' }
      }), {})
  );

  const getFieldSetter = (fieldname) => (value, valid, feedback) => (
    setFormData({ ...formData,
      [fieldname]: { value, valid, feedback }
    })
  );

  const getChangeHandler = (validator, fieldSetter) => (e) => {
    const value = e.target.value;
    const [valid, feedback] = validator(value, formData);
    fieldSetter(value, valid, feedback);
  };

  const fieldChangeHandlers = (
    fieldnames.reduce((handlers, fieldname) => ({ ...handlers,
      [fieldname]: getChangeHandler(fields[fieldname].validation, getFieldSetter(fieldname))
    }), {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = (
      Object.keys(formData)
        .reduce((vals, key) => ({ ...vals,
          [key]: formData[key].value
        }), {})
    );
    action(values);
  };

  const renderField = (fieldname) => (
    <FormInput
      key={fieldname}
      data={formData[fieldname]}
      name={fieldname}
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
    >
      {fieldnames.map(renderField)}
    </Form>
  );
};

export default ValidForm;