import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";

import List from "./components/listings/List";

interface HomeProps {
  searchParams: any;
}

const Home = async ({ searchParams }: HomeProps) => {

  return (
    <>
      <ClientOnly>
        <Container>
          <List
            searchParams={searchParams}
            bathroomCount={searchParams?.bathroomCount}
            guestCount={searchParams?.guestCount}
            locationValue={searchParams?.locationValue}
            roomCount={searchParams?.roomCount}
            category={searchParams?.category}
          />
        </Container>
      </ClientOnly>
    </>
  );
};

export default Home;
