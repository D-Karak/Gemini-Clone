import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { marked } from "marked";
interface ContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    prevPrompt: string[];
    setPrevPrompt: React.Dispatch<React.SetStateAction<string[]>>;
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
    const [prevPrompt, setPrevPrompt] = useState<string[]>([]);
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState<string>("");
    const [input, setInput] = useState("");


    async function onSend(prompt: string) {
        if (!prompt?.trim()) return;

        setResultData(""); // Clear previous result
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setPrevPrompt(prev => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });
        setInput("");
        const rawResponse = await runChat(prompt);
        setLoading(false);
        let currentText = "";
        const words = rawResponse.split(" "); // Typing word-by-word 

        words.forEach((word, index) => {
            setTimeout(() => {
                currentText += word + " ";

                const htmlOutput = marked.parse(currentText);
                setResultData(htmlOutput as string);

            }, 75 * index); // 75ms delay per word
        });

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