import { useEffect, useState } from "react";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import Table from "../../components/UI/Table/Table";
// import { events } from "../../dummyData";
import "./AllEventsPage.css";
import { IEvent } from "../../IEvent";
import useApi from "../../hooks/apiHook";
import { useLocation } from "react-router";
const AllEventsPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const { getVenueActivities } = useApi();
  const venueId = useLocation().state.venueId;
  useEffect(() => {
    getVenueActivities(venueId).then((res) => {
      console.log(res);
      setEvents(res);
      console.log("events", events);
    });
  }, []);

  const requiredColsEvents = events.map((event) => {
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
    <div className="all-events-page-container">
      <HomePageLayoutCards width="90%" height="100%">
        {events.length === 0 ? (
          <h1>No Events</h1>
        ) : (
          <>
            <div className="all-events-header">
              <h1>All Events</h1>
            </div>
            <Table
              columns={["Event Name", "Date", "Time"]}
              data={requiredColsEvents}
              allEvents={events}
            />
          </>
        )}
      </HomePageLayoutCards>
    </div>
  );
};
export default AllEventsPage;
