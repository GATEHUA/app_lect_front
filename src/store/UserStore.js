// import { create } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import Cookies from "js-cookie";

import {
  generateCodeRequest,
  loginRequest,
  logoutRequest,
  recoverPasswordRequest,
  recoverPasswordSendRequest,
  registerRequest,
  verifyCodeRequest,
  verifyTokenRequest,
} from "../api/auth";

export const useUserStore = createWithEqualityFn((set, get) => ({
  user: {},
  isAuthenticated: false,
  isLoading: true,
  signUp: async (value) => {
    // try {
    const res = await registerRequest(value);
    set((state) => {
      return {
        ...state,
        user: res.data,
        isAuthenticated: true,
      };
    });
    // } catch (error) {
    //   console.log("Error al registrarse", error);
    //   set((state) => {
    //     return { ...state, errors: error.response.data };
    //   });
    // }
  },
  // noErrors: () => {
  //   set((state) => {
  //     return { ...state, errors: [] };
  //   });
  // },
  signIn: async (value) => {
    // try {
    const res = await loginRequest(value);
    set((state) => {
      return {
        ...state,
        user: res.data,
        isAuthenticated: true,
      };
    });
    // } catch (error) {
    //   console.log("Error al iniciar sesion", error);
    //   set((state) => {
    //     return { ...state, errors: error.response.data };
    //   });
    // }
  },
  checkAuth: async () => {
    const token = Cookies.get("token");
    let user = {};
    let isAuthenticated = false;
    let isLoading = false;
    try {
      if (token) {
        const { data } = await verifyTokenRequest();
        if (data) {
          user = data;
          isAuthenticated = true;
        }
      }
    } catch (error) {
      console.log({ message: `Error al pedir datos de usuario`, error });
    }
    set((state) => ({
      ...state,
      user,
      isAuthenticated,
      isLoading,
    }));
  },

  checkVerify: async (value1, value2) => {
    const res = await verifyCodeRequest(value1, value2);
    set((state) => {
      return {
        ...state,
        user: res.data,
        isAuthenticated: true,
      };
    });
  },
  signOut: async (value) => {
    await logoutRequest(value);
    set((state) => {
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };
    });
  },
  generateCode: async (value) => {
    await generateCodeRequest(value);
  },
  recoverPassword: async (value1, value2) => {
    const res = await recoverPasswordRequest(value1, value2);
    set((state) => {
      return {
        ...state,
        user: res.data,
        isAuthenticated: true,
      };
    });
  },
  recoverPasswordSend: async (value) => {
    await recoverPasswordSendRequest(value);
  },

  // checkAuthTs: (value) => {
  //   let isAuthenticated = true;
  //   set((state) => ({
  //     ...state,
  //     user: value,
  //     isAuthenticated,
  //     // isLoading,
  //   }));
  // },
  // checkAuthTsfail: () => {
  //   let isAuthenticated = false;
  //   set((state) => ({
  //     ...state,
  //     user: {},
  //     isAuthenticated,
  //     // isLoading,
  //   }));
  // },
  // checkAuth: async () => {
  //   const token = Cookies.get("token");
  //   try {
  //     if (token) {
  //       try {
  //         const { data } = await verifyTokenRequest();
  //         if (!data) {
  //           return {
  //             ...state,
  //             user: {},
  //             isAuthenticated: false,
  //             isLoading: false,
  //           };
  //         }
  //         set((state) => {
  //           return {
  //             ...state,
  //             user: data,
  //             isAuthenticated: true,
  //             isLoading: false,
  //           };
  //         });
  //       } catch (error) {
  //         set((state) => {
  //           return {
  //             ...state,
  //             user: {},
  //             isAuthenticated: false,
  //             isLoading: false,
  //           };
  //         });
  //       }
  //     } else {
  //       set((state) => {
  //         return {
  //           ...state,
  //           user: {},
  //           isAuthenticated: false,
  //           isLoading: false,
  //         };
  //       });
  //     }
  //   } catch (error) {
  //     console.log({ message: `Error al pedir datos de usuario`, error });
  //   }
  // },
}));
