import { forwardRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const InputText = forwardRef(
  ({ id = "", type = "text", className = "", message, ...props }, ref) => {
    // const [pass, setPass] = useState(type);
    const colorMessageE = message
      ? `border-red-300 focus:ring-red-500 focus:border-red-500  dark:border-red-500 ${
          type === "date" ? "miInputDate" : ""
        }`
      : `border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500  `;

    return (
      <>
        <div className="w-full relative ">
          <input
            type={type}
            id={id}
            ref={ref}
            className={`  bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${className} ${colorMessageE}`}
            {...props}
          />
          {/* {type === "password" ? (
            <div
              className={`${
                message ? " pr-7" : "pr-1.5"
              }  absolute inset-y-0 right-0 pl-1 flex items-center `}
            >
              {pass === "password" ? (
                <IoIosEye
                  onClick={() => setPass("text")}
                  className="h-4 w-4 dark:text-white"
                />
              ) : (
                <IoIosEyeOff
                  onClick={() => setPass("password")}
                  className="h-4 w-4 dark:text-white"
                />
              )}
            </div>
          ) : null} */}

          {message && (
            <div
              data-tooltip-id={id}
              // class="absolute top-0 right-0 h-full p-2.5 "
              className="absolute inset-y-0 right-0 pl-1 pr-1.5 flex items-center "
              // class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <FiAlertCircle className=" h-4 w-4 text-red-600 dark:text-red-500" />
            </div>
          )}
        </div>
        <ReactTooltip id={id} variant="error" content={message} />
      </>
    );
  }
);

export default InputText;

// name={id}

// placeholder={placeholder}
// placeholder={`${
//   type === "email"
//     ? "tucorreo@ejemplo.com"
//     : type === "password"
//     ? "••••••••"
//     : placeholder
// }`}
