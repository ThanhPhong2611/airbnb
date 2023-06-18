'use client';
import EmptyState from "../components/EmptyState";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListingReservation from "../components/listings/ListingReservation";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import {ServerAPI, ListAPI} from '../environment/constant';

interface TripsClientProps {

}

const TripsClient: React.FC<TripsClientProps> = ({

}) => {
  const [reservations, setReservations] = useState([]);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const user = localStorage.getItem('user');
  const userParse = user ? JSON.parse(user) : null;
  const getData=async()=>{
    axios.get(`${ServerAPI}/${ListAPI.GET_ALL_TRIP_OF_USER}/${userParse._id}`).then((response)=>{
      setReservations(response.data.trips);
    }).catch((error)=>{

    }); 
  }
  useEffect(()=>{
    if(userParse && user){
      getData();
    }
  },[]);
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`${ServerAPI}/${ListAPI.TRIP_DELETE}/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
      getData();

    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);
  if(!user){
    return (
      <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
    )
  }
  if (reservations.length === 0) {
    return (

        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />

    );
  }
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation._id}
            // data={reservation}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"

          />
        ))}
      </div>
    </Container>
   );
}
 
export default TripsClient;