"use client";
import axios from "axios";
import Image from "next/image";
import ImageUpload from "../inputs/ImageUpload";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import useInfoModal from "../../hooks/useInfoModal";
import { CldUploadWidget } from "next-cloudinary";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { ServerAPI, ListAPI } from "../../environment/constant";

declare global {
  var cloudinary: any;
}
interface InfoProps {

}
const uploadPreset = "fosjneqo";

const InfoModal: React.FC<InfoProps> = ({  }) => {
  const router = useRouter();
  const infoModal = useInfoModal();
  const [isLoading, setIsLoading] = useState(false);
  const user = localStorage.getItem('user');
  const userParse = user ? JSON.parse(user) : null;
  const [username,setUsername] = useState(userParse && userParse?.name ? userParse.name : '');
  const handleUpload = useCallback(
    (result: any) => {
      // onChange(result.info.secure_url);
      setImageSrc(result.info.secure_url);
    },
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [imageSrc,setImageSrc] = useState(userParse?.imageSrc);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const dataUpdate = {
      name : username,
      id : userParse?._id,
      imageSrc: imageSrc,
    }
    axios.put(`${ServerAPI}/${ListAPI.UPDATE_USER}`, dataUpdate).then((callback) => {
      setTimeout(() => {
        setIsLoading(false);
        if (callback?.data) {
          let dataUser = {
            name: callback.data.user.name,
            email: callback.data.user.email,
            _id: callback.data.user._id,
            imageSrc : callback.data.user.imageSrc
          };
          localStorage.setItem("user", JSON.stringify(dataUser));
          location.reload()
          // router.refresh();
          infoModal.onClose();
        }
        if (!callback?.data) {
          console.log(callback);
        }
      }, 1000);
    }).catch((error)=>{
      setIsLoading(false);
      console.log(error);
    })
  };
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const changeName=(e : any)=>{
    console.log(e.target.value);
    setUsername(e.target.value)
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="" subtitle="Profile image" />
      <div className="relative h-40 w-1/3 text-center justify-center flex">
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset={uploadPreset}
          options={{
            maxFiles: 1,
          }}
        >
          {({ open }) => {
            return (
              <div>
                <Image
                  fill
                  className="
            relative
              object-cover 
              h-full 
              w-40
              group-hover:scale-110 
              transition
            "
                  src={imageSrc}
                  alt="User"
                />
                <div
                  className="absolute p-[10px] rounded-[50%] bg-surface right-3 bottom-3 cursor-pointer"
                  onClick={() => open?.()}
                >
                  <FiEdit2 className="text-white" size={20} />
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <Heading title="" subtitle="Name" />
      <div className="w-full relative">
      <input
        id="name"
        placeholder=""
        type='text'
        name="username"
        onChange={(e)=>changeName(e)}
        value={username}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        `}
      />
    </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={infoModal.isOpen}
      title="Information"
      actionLabel="Save"
      onClose={infoModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default InfoModal;
