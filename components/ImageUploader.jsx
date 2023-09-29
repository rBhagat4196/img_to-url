'use client';
import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4 as uuid} from "uuid"
import { useNavigation } from '../context/navigationContext';
import Loader from './Loader';
import {BiImage} from "react-icons/bi"
// import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageurl ,setimageurl] = useState(null);
  const {isLoading,setIsLoading} = useNavigation();
  const {setCopiedText} = useNavigation();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setimageurl("");
    // console.log(URL.createObjectURL(file));
  };

  const handleUpload = async() => {
    if(!selectedImage){
      alert("Please Select Image");
    }
    try {
        if (selectedImage) {
            const storageRef = ref(storage, uuid());
           
            const uploadTask = uploadBytesResumable(storageRef,selectedImage);
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                           setimageurl(downloadURL);
                           setCopiedText(downloadURL);
                           setIsLoading(false);
                           console.log(isLoading)
                        }
                    );
                }
            );
          setIsLoading(true);
          console.log(isLoading);
        }
    } catch (error) {
        console.error(error);
    }
  };

  return <>
      <div className=" flex flex-col  ">

        <div className="flex justify-center item-center relative">
          <div className=''>
            {(selectedImage) ? (
                <img src={URL.createObjectURL(selectedImage)} alt='thumbnail' height={400} width={400}/>
                ):(
                <BiImage className='h-[400px] w-[400px]'/>
            )}
          </div>
            <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer h-[250px] w-[300px] mx-auto my-auto"/>
        </div>

        <div className="flex justify-center items-center mt-5">
            <button onClick={handleUpload} className="bg-slate-500 rounded-3xl p-1">Upload Image</button>
        </div>


      <div className="mt-5">
        {isLoading ? <Loader/> : (

        <p className=''>
          {imageurl}
        </p>
        )}
      </div>


    </div>
  </>
    
};

export default ImageUploader;
