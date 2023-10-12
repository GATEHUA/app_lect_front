export const AlternativeG = ({
  children,
  disabled,
  onClick,
  className,
  name,
  checked,
  onChange,
  ...props
}) => {
  return (
    <li>
      <input
        type="radio"
        checked={checked}
        id={children}
        name={name}
        value={children}
        className="hidden peer"
        onClick={onClick}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        htmlFor={children}
        className={`inline-flex items-center justify-center w-full p-3 text-gray-200  border border-gray-200 rounded-lg  dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 dark:text-gray-400  ${className}`}
        {...props}
      >
        {/* dark:hover:bg-gray-700 */}
        {/* bg-white */}
        {/* dark:bg-gray-800 */}
        {/* hover:bg-gray-100 */}
        {/* bg-white */}
        <div className="block text-center">
          {/* <div className="w-full text-lg font-semibold">0-50 MB</div> */}
          <div className="font-medium ">{children}</div>
        </div>
      </label>
    </li>
  );
};
