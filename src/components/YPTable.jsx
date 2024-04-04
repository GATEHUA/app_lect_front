import { headTableYPQualy, headTableAlternatives } from "../data/data";
import { HeadTable } from "./HeadTable";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

export const YPTable = ({
  data,
  onShowFormQuestion,
  handleDeleteQuestion,
  onShowFormAlternative,
  handleDeleteAlternative,
}) => {
  console.log(data);
  return (
    <div
      className="overflow-auto relative shadow-md sm:rounded-lg"
      style={{ height: "85vh" }}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <HeadTable data={headTableYPQualy} />
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan="6"
                className="px-4 py-4 text-gray-500 dark:text-gray-400"
              >
                No hay Preguntas
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((question) => {
              return (
                <tr
                  key={question._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 ">
                    <div className="flex items-center justify-center gap-x-2">
                      <button
                        onClick={() => onShowFormQuestion(true, question)}
                      >
                        <BiEdit
                          size={18}
                          className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        <RiDeleteBin2Line
                          size={18}
                          className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.estadoAceptacion}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.puntajepregunta}
                    </div>
                  </td>

                  <td className="px-4 py-4 hidden">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.esquema}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.criterio}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.nivel}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {question.contenido}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      {question.refAlternativas.length > 0 && (
                        <table>
                          <HeadTable data={headTableAlternatives} />
                          <tbody>
                            {question.refAlternativas.map((value) => {
                              // const questionId = question._id;
                              // // console.log("questionId");

                              // // console.log(questionId);
                              return (
                                <tr
                                  key={value._id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <td className="px-4 py-4 ">
                                    <div className="flex items-center justify-center gap-x-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          onShowFormAlternative(true, value)
                                        }
                                      >
                                        <BiEdit
                                          size={18}
                                          className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleDeleteAlternative(
                                            value._id,
                                            question._id
                                          );
                                        }}
                                      >
                                        <RiDeleteBin2Line
                                          size={18}
                                          className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                                        />
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center justify-center whitespace-pre-line">
                                      {value.contenido}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center justify-center whitespace-pre-line">
                                      {value.estado}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center justify-center whitespace-pre-line">
                                      {value.feedback}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      {question.tipo}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      {question.puntobaserespuesta}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};
