import { useRef } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";

function Quill() {
  const editor = useRef(null);

  const { setValue, handleSubmit, watch } = useForm({
    defaultValues: { texto: "" },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleEditorChange = (content) => {
    setValue("texto", content);
  };
  // console.log("optimiz");

  return (
    <div className="flex justify-center">
      <div className="w-[50%]">
        <form onSubmit={onSubmit}>
          <JoditEditor value={watch("texto")} onBlur={handleEditorChange} />

          <button
            className="bg-red-500 p-3 text-white rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
        {watch("texto")}
      </div>
    </div>
  );
}

export default Quill;
