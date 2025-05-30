interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  helperText?: string;
  name: string;
  fullWidth?: boolean;
  placeHolderClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  width?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  helperText,
  name,
  // eslint-disable-next-line
  fullWidth = false,
  placeHolderClassName,
  value,
  onChange,
  required = false,
  width = "w-full",
}) => (
  <div className={`mb-[30px] max-sm:col-span-2`}>
    <label
      htmlFor={name}
      className="flex gap-2 text-[15px] font-medium text-[var(--charcoal-black)] mb-[10px]"
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className={`${width} ${placeHolderClassName} py-[5px] text-[13px] font-medium border-b-2 border-[var(--charcoal-black)] focus:border-green-600 placeholder:text-[var(--smoky-black)] outline-none transition-colors duration-300 bg-transparent`}
      value={value}
      onChange={onChange}
    />
    {helperText && (
      <p className="mt-[10px] italic text-xs font-light text-black">
        {helperText}
      </p>
    )}
  </div>
);

export default InputField;
