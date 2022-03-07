import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../database/axios";

interface Client {
  id: string;
  name: string;
}

interface SignInCredentialsClient {
  login: string;
  password: string;
}

interface AuthContextData {
  client: Client;
  signIn(credentials: SignInCredentialsClient): Promise<string | void>;
  signOut(): void;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client>({} as Client);

  useEffect(() => {
    const { "fakeatm.client": client } = parseCookies();
    const { "fakeatm.token": token } = parseCookies();

    if (client) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setClient(JSON.parse(client));
      
      navigate("/painel");
      return;
    }

    navigate("/");
  }, []);

  async function signIn({ login, password }: SignInCredentialsClient) {
    try {
      const response = await api.post("/clients/auth", {
        login,
        password,
      });

      const { token, client } = response.data;

      setCookie(undefined, "fakeatm.token", token, {
        maxAge: 60 * 60 * 24 * 1, // 1 days
        path: "/",
        secure: "none",
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setCookie(undefined, "fakeatm.client", JSON.stringify(client), {
        maxAge: 60 * 60 * 24 * 1, // 1 days
        path: "/",
        secure: "none",
      });

      setClient(client);

      navigate("/painel");
    } catch (err) {
      return "err";
    }
  }

  function signOut() {
    destroyCookie(undefined, "fakeatm.token");
    destroyCookie(undefined, "fakeatm.client");

    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ client, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
