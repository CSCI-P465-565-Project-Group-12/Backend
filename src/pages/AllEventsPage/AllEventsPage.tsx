import { useEffect, useState } from "react";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import Table from "../../components/UI/Table/Table";
import "./AllEventsPage.css";
import { IEvent } from "../../IEvent";
import useApi from "../../hooks/apiHook";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading-store";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
const AllEventsPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const { getVenueActivities } = useApi();
  const venueId = useLocation().state.venueId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadingActions.setLoading({ isLoading: true, message: "" }));
    getVenueActivities(venueId).then((res) => {
      dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
      setEvents(res);
    });
  }, []);
  console.log("events", events);

  const activeEvents = events.filter((event) => {
    return event.activityStatus === "open";
  });
  const requiredColsEvents = activeEvents.map((event) => {
    return {
      name: event.name,
      date: event.startTime,
      time: event.startTime
        .split("T")[1]
        .split(".")[0]
        .split(":")
        .slice(0, 2)
        .join(":"),
    };
  });
  console.log("requiredColsEvents", requiredColsEvents);

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
      <div className="all-events-page-container">
        <HomePageLayoutCards width="90%" height="100%">
          {events.length === 0 ? (
            <>
              <h1>No Events</h1>
              <button
                onClick={() => {
                  navigate("/create-event");
                }}
              >
                Create Events
              </button>
            </>
          ) : (
            <>
              <div className="all-events-header">
                <h1>All Events</h1>
              </div>
              <Table
                columns={["Event Name", "Date", "Time"]}
                data={requiredColsEvents}
                allEvents={activeEvents}
              />
            </>
          )}
        </HomePageLayoutCards>
      </div>
      <LoadingModal message="Loading Events.." />
    </>
  );
};
export default AllEventsPage;
