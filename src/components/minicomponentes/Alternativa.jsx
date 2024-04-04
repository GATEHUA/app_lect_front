import { forwardRef } from "react";

export const Alternativa = forwardRef(
  ({ stylo, className, val, ...props }, ref) => {
    return (
      <li>
        <input
          type="radio"
          ref={ref}
          id={val._id}
          name="hosting"
          value={val.contenido}
          className="hidden peer"
          {...props}
        />
        <label
          htmlFor={val._id}
          className={`inline-flex items-center justify-center w-full p-3 dark:text-white  border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-100 peer-checked:border-blue-400 peer-checked:text-blue-400 hover:text-gray-600    ${className}}`}
          style={stylo}
        >
          <div className="block">
            <div className="font-medium">{val.contenido}</div>
          </div>
        </label>
      </li>
    );
  }
);
