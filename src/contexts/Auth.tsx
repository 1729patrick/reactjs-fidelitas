import React, { createContext, useContext, useEffect, useState } from 'react';

import { ResponseError } from '../types/Api';

import api from '../utils/Api';

type LoginArgs = {
  email: string;
  password: string;
  type: 'admin';
  restaurantId?: number;
};

type ContextProps = {
  user?: any;
  token?: string;
  userLoaded: boolean;
  login: (args: LoginArgs) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<ContextProps>({
  user: undefined,
  token: undefined,
  userLoaded: false,
  login: async () => false,
  logout: () => undefined,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('@fidelitas:token');
    if (token) {
      restoreToken(token);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('@fidelitas:user', user);
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('@fidelitas:token', token);
  }, [token]);

  const setAuthorization = (token: string) => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  };

  function restoreToken(token: string = '') {
    setAuthorization(token);
    setToken(token);
    setUserLoaded(true);
  }

  const login = async (args: LoginArgs) => {
    try {
      const { data } = await api.post<{ user: any; token: string }>(
        'auth/login',
        args,
      );

      setUser(data.user);
      setToken(data.token);
      setAuthorization(data.token);

      return true;
    } catch ({ response }) {
      const { data } = response as ResponseError;

      console.log(data.message);

      return false;
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem('@fidelitas:token');
    localStorage.removeItem('@fidelitas:user');
  };

  return (
    <AuthContext.Provider value={{ user, token, userLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
