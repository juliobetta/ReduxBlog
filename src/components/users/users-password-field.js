import React from 'react';
import FormGroup from '../elements/form-group';


export default ({ label, field }) => {
  return (
    <FormGroup label={label} field={field}>
      <input type="password" { ...field } className="form-control" />
    </FormGroup>
  );
};
