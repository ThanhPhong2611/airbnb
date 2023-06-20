'use client';

import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useInfoModal from "../../hooks/useInfoModal";
import useRentModal from "../../hooks/useRentModal";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import axios from "axios";
import { ServerAPI, ListAPI } from "../../environment/constant";

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = ({

}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const infoModal = useInfoModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const [currentUser, setCurrentUser] = useState({
    imageSrc : '',
    name : '',
  });
  const user = localStorage.getItem('user');
  const userParse = user ? JSON.parse(user) : null;
  useEffect(()=>{
    if(user){
      setCurrentUser(userParse);
    }
  },[])
  const logout = () => {
      axios.get(`${ServerAPI}/${ListAPI.LOGOUT}`).then(() => {
      localStorage.removeItem('user');
      // router.refresh();
      location.reload()
    });
  };
  const onRent = useCallback(() => {
    if (!currentUser || !currentUser?.name) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.imageSrc} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser && currentUser.name && currentUser.name !== '' ? (
              <>
                <MenuItem 
                  label={currentUser.name}
                  onClick={infoModal.onOpen}
                />
              
                <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={() => router.push('/home')}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => logout()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;