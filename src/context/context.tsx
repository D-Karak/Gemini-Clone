import { createContext } from "react";
import runChat from "../config/gemini";
export const Context = createContext({});
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const onSend = async (prompt: string) => {
        runChat(prompt);
    }
    const contextValue = {
        onSend
    }
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};
export default ContextProvider;