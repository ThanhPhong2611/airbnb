'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { toast } from "react-hot-toast";

import useCountries from "../../hooks/useCountries";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useEffect , useState} from "react";
import { ServerAPI, ListAPI } from "../../environment/constant";
import axios from "axios";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  userId : string;
  user: any,
  description: string;
  guestCount: any;
  roomCount: any;
  bathroomCount: any;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: any;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  userId,
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const [userInfo,setUserInfo] = useState({
    name : '',
    imageSrc : '',
  });
  const coordinates = getByValue(locationValue?.value)?.latlng;
  const getUser = async ()=>{
   
    axios.get(`${ServerAPI}/${ListAPI.GET_ONE_USER}/${userId}`).then((data) => {
      setUserInfo(data.data.user);
    }).catch(err=>{
      console.log(err);
    });
  }
  useEffect(()=>{
    if(userId){
      getUser();
      
    }
  },[userId])
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {userInfo?.name}</div>
          <Avatar src={userInfo?.imageSrc} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;