// @ts-nocheck
import React from "react";
import userData from "../data/users.json";

import { createContext, useContext, useEffect, useState } from "react";

interface usersContextType {
  user: User | undefined;
  users: User[] | undefined;
  getUser: (userId: number) => User | undefined;
  activeUser: (userId: number) => void;
}

export interface User {
  usrId: number;
  usrName: string;
  usrAvatar: string;
}

interface UsersContextProps {
  children: React.ReactNode;
}

const UsersContext = createContext<usersContextType | undefined>(undefined);

const getImagePath = (imageName: string) => {
  return `/avatars/${imageName}`;
};

export function useUserContext() {
  return useContext(UsersContext);
}

export const UsersProvider: React.FC<UsersContextProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>(
    userData.users[Math.floor(Math.random() * 4)]
  );

  useEffect(() => {
    const processedUsers = userData.users.map((user) => {
      return { ...user, usrAvatar: getImagePath(user.usrAvatar) };
    });
    setUsers(processedUsers);
  }, []);

  const activeUser = (userId: number) => {
    setUser(getUser(userId));
  };

  const getUser = (userId: number) => {
    return users.find((user) => user.usrId === userId);
  };

  return (
    <UsersContext.Provider value={{ user, getUser, users, activeUser }}>
      {children}
    </UsersContext.Provider>
  );
};
