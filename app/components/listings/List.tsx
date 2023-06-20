"use client";

import axios from "axios";
import { ServerAPI, ListAPI } from "../../environment/constant";
import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Loader from "../Loader";
import EmptyState from "../EmptyState";
interface ListProps {
  searchParams: object;
  bathroomCount: string;
  guestCount: string;
  locationValue: string;
  roomCount: string;
  category: string;
}

const List: React.FC<ListProps> = ({
  searchParams,
  bathroomCount,
  guestCount,
  locationValue,
  roomCount,
  category,
}) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAll = async function () {
    let url = ServerAPI + "/" + ListAPI.LISTING_GETALL;
    if (searchParams) {
      console.log(searchParams);
      url += "/?";
      if (bathroomCount) {
        url += "bathroomCount=" + bathroomCount + "&";
      }
      if (guestCount) {
        url += "guestCount=" + guestCount + "&";
      }
      if (locationValue) {
        url += "locationValue=" + locationValue + "&";
      }
      if (roomCount) {
        url += "roomCount=" + roomCount + "&";
      }
      if (category) {
        url += "category=" + category + "&";
      }
    }
    setLoading(true);
    await axios
      .get(url)
      .then((response) => {
        let listings = response.data.listings;
        setListings(listings);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAll();
  }, [searchParams]);
  return (
    <>
      {loading ? (
        <div className="center flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : listings && listings?.length > 0 ? (
        <div
          className="
            pt-24
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
          {listings?.map((listing: any) => (
            <ListingCard
              // currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No post found"
          subtitle="There are no posts matching your needs."
        />
      )}
    </>
  );
};
export default List;
