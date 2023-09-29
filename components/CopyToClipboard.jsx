'use client';
import { useState } from 'react';
import { useNavigation } from '../context/navigationContext';
const CopyToClipboardButton = ({ textToCopy }) => {
  const {isEmpty , setIsEmpty,copiedText} = useNavigation();

  const copyToClipboard = async () => {
    if(copiedText.length < 10 ) alert("Nothing To Copy");
    if(copiedText.length > 10){
      try {
        await navigator.clipboard.writeText(copiedText);
        setIsEmpty(false);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
  
      // Reset the "Copied" status after a few seconds
      setTimeout(() => {
        setIsEmpty(false);
      }, 2000);
    }
  };

  return (
    <div className='m-10 flex items-center justify-center'>
      <button onClick={copyToClipboard} className='border-4 border-red-200 bg-blue-400 rounded-full text-black p-2'>
        {isEmpty ? 'Copy to Clipboard' : 'Copied!'}
      </button>
    </div>
  );
};

export default CopyToClipboardButton;