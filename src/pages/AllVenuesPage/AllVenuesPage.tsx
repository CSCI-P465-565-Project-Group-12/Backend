import { useEffect, useState } from "react";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import VenuesTable from "../../components/UI/Table/VenuesTable";
import "./AllVenuesPage.css";
import useApi from "../../hooks/apiHook";

interface INewVenueInterface extends IVenue {
  venueId: string;
}

const AllVenuesPage = () => {
  const [venues, setVenues] = useState<INewVenueInterface[]>([]);
  const { getAllVenues } = useApi();
  useEffect(() => {
    getAllVenues().then((res) => {
      console.log(res);
      setVenues(res);
    });
  }, []);
  const requiredColsVenues = venues.map((venue) => {
    return {
      name: venue.name,
      street: venue.street,
      status: venue.venueStatus,
    };
  });
  return (
    <div className="all-venues-page-container">
      <HomePageLayoutCards width="90%" height="100%">
        <div className="all-venues-header">
          <h1>All Venues</h1>
        </div>
        <VenuesTable
          columns={["Venue Name", "Status", "Location"]}
          displayData={requiredColsVenues}
          data={venues}
        />
      </HomePageLayoutCards>
    </div>
  );
};
export default AllVenuesPage;
