'use client';
import EmptyState from "../components/EmptyState";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListingReservation from '../components/listings/ListingReservation';
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import {ServerAPI, ListAPI} from '../environment/constant';

interface HomeClientProps {
  reservations?: any,
  currentUser?: any,
}

const HomeClient: React.FC<HomeClientProps> = ({

}) => {
  const [reservations, setReservations] = useState([]);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const user = localStorage.getItem('user');
  const userParse = user ? JSON.parse(user) : {
    _id : ''
  };
  const getData=async()=>{
    await axios.get(`${ServerAPI}/${ListAPI.GET_ALL_LIST_OF_USER}/${userParse._id}`).then((response)=>{
      setReservations(response.data.list);
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

    axios.delete(`${ServerAPI}/${ListAPI.LIST_DELETE}/${id}`)
    .then(() => {
      toast.success('Location cancelled');
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
  if (reservations?.length === 0) {
    return (

        <EmptyState
          title="No Home found"
          subtitle="Looks like you havent reserved any Home."
        />

    );
  }
  return (
    <Container>
      <Heading
        title="Home"
        subtitle="Post your location"
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
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation._id}
            data={reservation}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Delete location"

          />
        ))}
      </div>
    </Container>
   );
}
 
export default HomeClient;