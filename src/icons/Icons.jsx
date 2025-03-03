export const Libro = ({ width = 42, height = 34, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        fill="#000" //pasta
        fillOpacity={0.2}
        fillRule="evenodd"
        d="M19.511 8.14a10.022 10.022 0 0 0-7.447-3.273h-8.34C1.666 4.867 0 6.49 0 8.492v17.273c0 2.002 1.666 3.625 3.722 3.625h7.846c3.8 0 4.734.976 5.638 1.92.721.752 1.422 1.484 3.543 1.685.104.01.205.005.302-.012.064.004.13.001.197-.008 1.6-.208 2.299-.833 3.038-1.495 1.054-.943 2.193-1.962 6.146-1.962h7.846c2.056 0 3.722-1.623 3.722-3.626v-17.4c0-2.002-1.667-3.625-3.724-3.625h-8.34a10.022 10.022 0 0 0-7.446 3.272v18.157a4.278 4.278 0 0 1-.721.45.824.824 0 0 1-.766.285 4.267 4.267 0 0 1-.07-.012.766.766 0 0 1-.55-.137 3.485 3.485 0 0 1-.872-.427V8.14Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff" //paginas
        fillRule="evenodd"
        d="M5.113 3.9C5.113 2.3 6.447 1 8.092 1h5.957C17.04 1 19.645 2.61 21 4.987a7.793 7.793 0 0 0-1.488-1.868v23.336c-.264-.177-.496-.377-.736-.583-.92-.79-1.942-1.67-5.222-1.67H8.091c-1.645 0-2.978-1.298-2.978-2.9V3.902Zm16.473 23.007a.87.87 0 0 0 .183-.161c.441-.212.793-.499 1.166-.803.99-.808 2.134-1.74 5.512-1.74h5.462c1.645 0 2.977-1.299 2.977-2.9V3.9c0-1.602-1.333-2.9-2.978-2.9H27.95a8.031 8.031 0 0 0-5.46 2.116v23.179a4.278 4.278 0 0 1-.721.45.872.872 0 0 1-.183.161Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff" //linea central
        fillRule="evenodd"
        d="M19.511 3.119A7.793 7.793 0 0 1 21 4.987a7.795 7.795 0 0 1 1.49-1.87v23.179a4.278 4.278 0 0 1-.721.45.824.824 0 0 1-.766.285 4.267 4.267 0 0 1-.07-.012.766.766 0 0 1-.55-.137 3.485 3.485 0 0 1-.872-.427V3.12Z"
        clipRule="evenodd"
        opacity={0.4}
      />
    </svg>
  );
};
export const LibroC = ({ width = 42, height = 34, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        fill="#CD7900" //pasta derecha
        d="M42 8.492c0-2.002-1.667-3.625-3.724-3.625h-8.34c-5.484 0-9.93 4.328-9.93 9.668V31.84c0 .668.563 1.224 1.242 1.135 3.881-.505 2.455-3.457 9.184-3.457h7.846c2.056 0 3.722-1.623 3.722-3.626v-17.4Z"
      />
      <path
        fill="#CD7900" //pasta izquierda
        d="M0 8.492C0 6.49 1.667 4.867 3.723 4.867h8.341c5.484 0 9.93 4.328 9.93 9.668V31.84c0 .668-.563 1.22-1.245 1.155-4.779-.452-2.35-3.604-9.181-3.604H3.722C1.666 29.39 0 27.767 0 25.764V8.492Z"
      />
      <path
        fill="#FFF1C0" //pagina derecha
        d="M36.886 3.9c0-1.601-1.333-2.9-2.978-2.9H27.95c-4.387 0-7.943 3.463-7.943 7.734v17.402c0 .534.452.986.988.872 2.353-.5 2.14-2.805 7.451-2.805h5.463c1.645 0 2.977-1.299 2.977-2.9V3.9Z"
      />
      <path
        fill="#FFF1C0" //pagina izquierda
        d="M5.113 3.9C5.113 2.3 6.447 1 8.092 1h5.957c4.388 0 7.944 3.463 7.944 7.734v17.402c0 .534-.448.982-.99.895-2.767-.45-2.055-2.828-7.45-2.828H8.091c-1.645 0-2.978-1.299-2.978-2.9V3.9Z"
      />
      <path
        fill="#E6A000" // linea central
        fillRule="evenodd"
        d="M19.511 3.119A7.796 7.796 0 0 1 21 4.987c.396-.696.9-1.327 1.49-1.87v23.179a4.278 4.278 0 0 1-.721.45.824.824 0 0 1-.766.285 4.455 4.455 0 0 1-.07-.012.766.766 0 0 1-.55-.137 3.481 3.481 0 0 1-.872-.427V3.12Z"
        clipRule="evenodd"
        opacity={0.4}
      />
    </svg>
  );
};
export const FondoLibroC = ({ width = 56, height = 46, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        fill="#FFE700"
        d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39.118 39.118 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23L34.235 3.25ZM55.095 12.523c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565Z"
      />
    </svg>
  );
};

export const LibroSection = ({ width = 24, height = 24, ...props }) => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M.019 4.833c0-.728.59-1.318 1.318-1.318h1.758a1.318 1.318 0 0 1 0 2.636H1.337C.61 6.15.02 5.56.02 4.833ZM.019 11.863c0-.728.59-1.318 1.318-1.318h1.758a1.318 1.318 0 1 1 0 2.636H1.337C.61 13.18.02 12.59.02 11.863ZM.019 18.892c0-.728.59-1.318 1.318-1.318h1.758a1.318 1.318 0 1 1 0 2.636H1.337C.61 20.21.02 19.62.02 18.892Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M2.655 3.515V6.15h.44a1.318 1.318 0 1 0 0-2.636h-.44Zm.44-1.758h-.002a3.437 3.437 0 0 1 3-1.757h14.32c1.9 0 3.439 1.54 3.439 3.438v16.849a3.438 3.438 0 0 1-3.439 3.438H6.093a3.437 3.437 0 0 1-3-1.757h.002a3.076 3.076 0 0 0 0-6.151h-.44v-.879h.44a3.075 3.075 0 1 0 0-6.15h-.44v-.88h.44a3.076 3.076 0 1 0 0-6.15Zm0 18.453h-.44v-2.636h.44a1.318 1.318 0 1 1 0 2.636Zm0-7.03h-.44v-2.635h.44a1.318 1.318 0 1 1 0 2.636Zm6.81-9.226a1.098 1.098 0 1 0 0 2.197h9.226a1.098 1.098 0 0 0 0-2.197H9.905Zm-1.099 6.37c0-.606.492-1.097 1.099-1.097h9.226a1.098 1.098 0 0 1 0 2.196H9.905a1.098 1.098 0 0 1-1.099-1.098ZM9.905 14.5a1.098 1.098 0 1 0 0 2.197h6.59a1.098 1.098 0 0 0 0-2.197h-6.59Z"
      clipRule="evenodd"
    />
  </svg>;
};
