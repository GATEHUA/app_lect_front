export const searchFunction = (data, search) =>
  data.filter((item) => {
    const allData = Object.values(item);
    return allData.some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

export const searchFunctionStatus = (data, search) =>
  data.filter((item) => {
    const allData = Object.values(item).concat(
      item.refUsuario && Object.values(item.refUsuario).flat(),
      item.refLecturas && item.refLecturas.map((x) => Object.values(x))
    );
    return allData.some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

// export const search = (data, search) => {
//   return data.filter((item) => {
//     const allData = Object.values(item);
//     return allData.some(
//       (value) =>
//         value && value.toString().toLowerCase().includes(search.toLowerCase())
//     );
//   });
// };
