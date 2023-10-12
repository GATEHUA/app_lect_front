const Camino = () => {
  const caminoDaarta = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
    23,
  ];
  // Array.from({ length: 24 }, (_, index) => index + 1);
  caminoDaarta.map((e) => {
    console.log(`data ${e} resyo -> ${e % 8}`);
  });
  return (
    <>
      <div className="flex justify-center w-screen">
        <div>
          {caminoDaarta.map((e) => {
            // console.log(e);

            return (
              <div key={e} className="w-[1000px] flex justify-center">
                <button
                  className={` bg-blue-500 p-7 rounded-full w-24 h-24 mb-3 ${
                    //   e % 4 === 1
                    //     ? ""
                    e % 8 === 2
                      ? "ml-32"
                      : e % 8 === 3
                      ? "ml-64"
                      : e % 8 === 4
                      ? "ml-32"
                      : e % 8 === 6
                      ? "mr-32"
                      : e % 8 === 7
                      ? "mr-64"
                      : e % 8 === 0
                      ? "mr-32"
                      : ""
                  }
        `}
                >
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/9c1469fc6d708e630b5bb53ce60377db.svg"
                    alt=""
                  />
                  {e}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Camino;
