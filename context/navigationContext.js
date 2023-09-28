'use client';
import { Context, createContext, useContext, useState } from 'react'
const NavigationContext = createContext();
export const NavigationProvider = ({children})=>{
    const [copiedText,setCopiedText] = useState("hello");
    const [isEmpty , setIsEmpty] = useState(true);
    return (
        <NavigationContext.Provider value = {{
            copiedText , 
            setCopiedText,
            isEmpty,
            setIsEmpty,
            }}>
        {children}
    </NavigationContext.Provider>
  );
}
export const useNavigation = ()=> useContext(NavigationContext);