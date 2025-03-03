import { useEffect, useRef } from "react";

export const ButtonTouch = ({
  children,
  onClick,
  className,
  initialTouchColor,
  ...props
}) => {
  const styleBase = ` relative  ${className}`;
  //   console.log(styleBase);
  const botonA = useRef(null);
  const handleMouseDown = () => {
    botonA.current.className = `${styleBase} pressTouch`;
  };
  const handleTouchStart = () => {
    botonA.current.className = `${styleBase} pressTouch`;
  };

  const handleTouchEnd = () => {
    botonA.current.className = `${styleBase + " " + initialTouchColor}`;
  };
  useEffect(() => {
    const buttonElement = botonA.current;

    if ("ontouchstart" in window) {
      // Dispositivo táctil, ejecutar el código específico para móviles
      buttonElement.addEventListener("touchstart", handleTouchStart);
      buttonElement.addEventListener("touchend", handleTouchEnd);

      return () => {
        buttonElement.removeEventListener("touchstart", handleTouchStart);
        buttonElement.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [styleBase]);
  // useEffect(() => {
  //   const buttonElement = botonA.current;

  //   buttonElement.addEventListener("touchstart", handleTouchStart);
  //   buttonElement.addEventListener("touchend", handleTouchEnd);

  //   return () => {
  //     buttonElement.removeEventListener("touchstart", handleTouchStart);
  //     buttonElement.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, [styleBase]);
  useEffect(() => {
    const handleMouseUp = () => {
      botonA.current.className = `${styleBase + " " + initialTouchColor} `;
    };
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [styleBase]);

  return (
    <button
      onClick={onClick}
      ref={botonA}
      {...props}
      className={`${styleBase + " " + initialTouchColor}`}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

// export const ButtonTouch = ({ children, onClick, className, ...props }) => {
//   const styleBase = useRef(`p-7 rounded-full z-20 ${className}`);
//   const botonA = useRef(null);
//   const handleMouseDown = () => {
//     botonA.current.className = `${styleBase.current} pressTouch`;
//   };

//   useEffect(() => {
//     const handleMouseUp = () => {
//       botonA.current.className = `${styleBase.current}  initialTouch`;
//     };
//     document.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <button
//       onClick={onClick}
//       ref={botonA}
//       {...props}
//       className={`${styleBase.current} initialTouch`}
//       onMouseDown={handleMouseDown}
//     >
//       {children}
//     </button>
//   );
// };

// import { useState, useEffect } from "react";

// export const ButtonTouch = ({ children, onClick, className, ...props }) => {
//   const [botonA, setBotonA] = useState(true);

//   useEffect(() => {
//     const handleMouseUp = () => {
//       setBotonA(true);
//     };
//     document.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <button
//       onClick={onClick}
//       {...props}
//       className={`p-7 rounded-full z-20 ${className} ${
//         botonA ? "initialTouch" : "pressTouch"
//       } `}
//       onMouseDown={() => {
//         setBotonA(false);
//       }}
//     >
//       {children}
//     </button>
//   );
// };
