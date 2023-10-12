const Label = ({ htmlFor = "", children, className = "", ...props }) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-900 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
