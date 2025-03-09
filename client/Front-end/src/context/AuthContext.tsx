import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../types/registration/users";

// Define the AuthContext type
interface AuthContextType {
  auth?: User; // Allow auth to be undefined
  setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
}

// Create context with default value as undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User | undefined>(undefined);
  console.log(auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
