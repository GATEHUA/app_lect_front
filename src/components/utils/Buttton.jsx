const Buttton = ({ children, onClick, className, ...props }) => {
  // const coloreado = `dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800 focus:ring-${color}-300 bg-${color}-700 hover:bg-${color}-800`;
  // const coloreado = `focus:ring-${color}-400 bg-${color}-600 hover:bg-${color}-700`;
  return (
    <button
      onClick={onClick}
      {...props}
      className={`text-white focus:outline-none rounded-lg text-center  focus:ring-4
      ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Buttton;
