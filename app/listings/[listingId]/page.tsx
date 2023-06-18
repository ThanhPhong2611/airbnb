import getCurrentUser from "../../actions/getCurrentUser";


import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <ListingClient params={params} reservations={[]} />
    </ClientOnly>
  );
};

export default ListingPage;
