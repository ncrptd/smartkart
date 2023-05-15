import FormInput from '../forminput/FormInput';
import FormCheckbox from '../formcheckbox/FormCheckbox';

import './form.css';
function Form() {
  return (
    <form className="flex-1">
      <FormInput placeholder="johndoe@email.com" label="Email" />
      <FormInput placeholder="********" label="Password" />
      <FormCheckbox label="I accept all terms and conditions" />
    </form>
  );
}

export default Form;
