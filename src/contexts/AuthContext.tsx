import Router from "next/router";

import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { User } from "../domain/User";
import { getInfosDecodedToken } from "../utils/getInfosDecodedToken";
import { api } from "../services/apiClient";
import { createAuthenticationUser, getUser } from "../services/userApi/user";
import { destroyAllCookies } from "../utils/destroyAllCookies";

type SignInCredentials = {
  name: string;
  password: string;
};

type AuthContextData = {
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export const signOut = (broadcast = true) => {
  destroyAllCookies({});

  if (broadcast) {
    authChannel.postMessage("signOut");
  }

  Router.push("/");
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut(false);
          break;
        case "signIn":
          Router.push("/");
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "challengeSurflex.token": token } = parseCookies();

    (async () => {
      if (token) {
        const userId = await getInfosDecodedToken(token);

        await getUser({ id: userId })
          .then((user) => {
            const { id, name, created_at } = user;

            setUser({
              id,
              name,
              created_at,
            });
          })
          .catch(() => {});
      }
    })();
  }, []);

  const signIn = async ({ name, password }: SignInCredentials) => {
    try {
      const { token, user } = await createAuthenticationUser({
        name,
        password,
      });
      const { created_at, id } = user;

      if (!token || !user) {
        throw "E-mail ou senha incorreta!";
      }

      setCookie(undefined, "challengeSurflex.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: "/",
      });

      api.defaults.headers.Authorization = `${token}`;

      setUser({
        id,
        name,
        created_at,
      });

      authChannel.postMessage("signIn");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
