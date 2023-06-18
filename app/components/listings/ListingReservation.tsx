"use client";
import axios from "axios";

import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

import Button from "../Button";
import { ServerAPI, ListAPI } from "../../environment/constant";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  imageSrc : string;
  slug : string;
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  user : any;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  imageSrc,
  slug,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  onSubmit = () => {
    const user = localStorage.getItem('user');

  
    if(user){
      const userParse = JSON.parse(user);
      const id = userParse?._id;
      const data = {
        price,
        imageSrc : imageSrc,
        startDate : dateRange.startDate,
        endDate : dateRange.endDate,
        totalPrice,
        userId : id,
        listingId : slug,
      };
      axios.post(`${ServerAPI}/${ListAPI.TRIP_REGISTER}`, data).then((response) => {
        toast.success('Checkout my trips');
      }).catch(err => {
  
      });
    }else{
      toast.error('Please login before');
    }
   
  };
  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
