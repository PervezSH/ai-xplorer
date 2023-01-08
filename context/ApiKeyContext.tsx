import react, { createContext, useState, useContext } from 'react';

interface ApiKeyContextType {
    apiKey: string;
    setApiKey: (apiKey: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
    apiKey: "",
    setApiKey: () => { }
});

export const ApiKeyProvider = ({ children }: any) => {
    const [apiKey, setApiKey] = useState<string>("");

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = () => {
    return useContext(ApiKeyContext);
};