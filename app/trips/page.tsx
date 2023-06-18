
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import TripsClient from "./TripsClient";

const TripsPage = async () => {

  return (
    <ClientOnly>
      <TripsClient
      />
    </ClientOnly>
  );
}
 
export default TripsPage;
