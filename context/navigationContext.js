'use client';
import { Context, createContext, useContext, useState } from 'react'
const NavigationContext = createContext();
export const NavigationProvider = ({children})=>{
    const [copiedText,setCopiedText] = useState("");
    const [isEmpty , setIsEmpty] = useState(true);
    const [isLoading , setIsLoading] = useState(false);
    return (
        <NavigationContext.Provider value = {{
            copiedText , 
            setCopiedText,
            isEmpty,
            setIsEmpty,
            isLoading,
            setIsLoading
            }}>
        {children}
    </NavigationContext.Provider>
  );
}
export const useNavigation = ()=> useContext(NavigationContext);