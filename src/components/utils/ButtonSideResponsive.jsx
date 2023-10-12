export const ButtonSideResponsive = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="m-1 dark:hover:bg-slate-500 rounded-full p-1 dark:text-white block sm:hidden absolute top-0 cursor-pointer"
    >
      <MdMenu size={25} />
    </button>
  );
};
