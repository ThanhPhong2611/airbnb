
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";


import HomeClient from "./HomeClient";

const HomePage = async () => {

  return (
    <ClientOnly>
      <HomeClient
      />
    </ClientOnly>
  );
}
 
export default HomePage;
