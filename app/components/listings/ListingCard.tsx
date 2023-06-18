'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from 'date-fns';

import useCountries from "../../hooks/useCountries";

import axios from "axios";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import {ServerAPI, ListAPI} from '../../environment/constant';

interface ListingCardProps {
  data?: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  startDate? : Date;
  endDate? : Date;
};

const ListingCard: React.FC<ListingCardProps> = ({
  startDate,
  endDate,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',


}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [dataApi, setDataApi] = useState({
    _id : '',
    imageSrc : '',
    location : {
      region : '',
      label : '',
    }
  });


  useEffect(()=>{
    if(!data){
      axios.get(`${ServerAPI}/${ListAPI.GET_ONE}/${reservation?.listingId}`).then((response)=>{
        setDataApi(response.data.list);

      }).catch((error)=>{

      });
    }
  },[])
  const location = getByValue(data?.location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation?.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation?.startDate);
    const end = new Date(reservation?.endDate);
    if(reservation?.startDate && reservation?.endDate){
      return `${format(start, 'PP')} - ${format(end, 'PP')}`;

    }else{
      return null;
    }

  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data ? data._id : dataApi?._id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data ? data?.imageSrc : dataApi?.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data ? data?._id : dataApi?._id} 
             
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data ? data?.location?.region : dataApi?.location?.region}, {data ? data?.location?.label : dataApi?.location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data?.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;