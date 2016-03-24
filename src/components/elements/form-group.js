import React, { Component } from 'react';


class FormGroup extends Component {

  checkValid(field) {
    return field.touched && field.invalid ? 'has-danger' : '';
  }


  checkError(field) {
    return field.touched ? field.error : '';
  }


  render() {
    const { label, field } = this.props;

    return (
      <div className={`form-group ${this.checkValid(field)}`}>
        <label>{label}</label>
        {this.props.children}
        <div className="text-help">{this.checkError(field)}</div>
      </div>
    );
  }

}


export default FormGroup;
