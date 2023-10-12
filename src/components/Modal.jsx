import { AiOutlineClose } from "react-icons/ai";

export const Modal = ({ onShowForm, children, titleModal = "", className }) => {
  return (
    <div className={`relative w-full max-h-full ${className}`}>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          onClick={() => {
            onShowForm(false);
          }}
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            {titleModal}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};
