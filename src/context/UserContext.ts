import { Context, createContext } from "react";
import { User } from "@/types/userType";

export const UserContext = createContext<User>(null);
