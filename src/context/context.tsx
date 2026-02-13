import { createContext, useState } from "react";
import runChat from "../config/gemini";

interface ContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    prevPrompt: string;
    setPrevPrompt: React.Dispatch<React.SetStateAction<string>>;
    recentPrompt: string;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    showResult: boolean;
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    resultData: string;
    setResultData: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onSend: (prompt: string) => Promise<void>;
}

export const Context = createContext<ContextType>({} as ContextType);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [prevPrompt, setPrevPrompt] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState("");
    const [input, setInput] = useState("");

    async function onSend(prompt: string) {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);

        // If the prompt argument is provided, use it. Otherwise use the input state.
        // The implementation here assumes prompt is always passed, which aligns with your interface.
        const response = await runChat(prompt);

        setResultData(response || "");
        setLoading(false);
        setInput("");
    }

    const contextValue: ContextType = {
        prevPrompt,
        setPrevPrompt,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        input,
        setInput,
        onSend
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;