function FormInput(props) {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input type="text" placeholder={props.placeholder} id={props.label} />
    </div>
  );
}

export default FormInput;
