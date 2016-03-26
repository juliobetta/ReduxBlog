import React     from 'react';
import FormField from '../elements/form-field';
import FormGroup from '../elements/form-group';


export default (props = {}) => {
  const {
    fields: { current_password, password, password_confirmation }
  } = props;

  let fields = [
    { label: 'Password', control: password },
    { label: 'Password Confirmation', control: password_confirmation }
  ];

  if(props.currentUser) {
    fields.push({ label: 'Current Password', control: current_password });
  }

  return (
    <div>
      {fields.map((field, i) => {
        return (
          <FormGroup key={i} label={field.label} field={field.control}>
            <FormField password {...field.control} />
          </FormGroup>
        );
      })}
    </div>
  );
};
