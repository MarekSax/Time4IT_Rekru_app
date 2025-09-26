import { Input } from './input';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}
const InputField = ({ name, label, placeholder, type = 'text' }: InputFieldProps) => {
  return (
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className="text-base font-normal placeholder:text-gray-500"
      />
    </label>
  );
};

export default InputField;
