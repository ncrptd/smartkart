function FormCheckbox(props) {
  return (
    <div className="form-checkbox">
      <label htmlFor={props.label}>{props.label}</label>
      <input type="checkbox" id={props.label} />
    </div>
  );
}

export default FormCheckbox;
