import { useEffect, useState } from "react";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import VenuesTable from "../../components/UI/Table/VenuesTable";
import "./AllVenuesPage.css";
import useApi from "../../hooks/apiHook";
import { useNavigate } from "react-router";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading-store";

interface INewVenueInterface extends IVenue {
  id: string;
}

const AllVenuesPage = () => {
  const [venues, setVenues] = useState<INewVenueInterface[]>([]);
  const { getAllVenues } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingActions.setLoading({ isLoading: true, message: "" }));
    getAllVenues().then((res) => {
      console.log(res);
      setVenues(res);
      dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
      console.log("venues", venues);
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
    <>
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="bi bi-arrow-left-circle-fill" />
      </div>
      <div className="all-venues-page-container">
        <HomePageLayoutCards width="90%" height="100%">
          <div className="all-venues-header">
            <h1>All Venues</h1>
          </div>
          <VenuesTable
            columns={["Venue Name", "Location", "Status"]}
            displayData={requiredColsVenues}
            data={venues}
          />
        </HomePageLayoutCards>
      </div>
      <LoadingModal message="Loading Venues..." />
    </>
  );
};
export default AllVenuesPage;
