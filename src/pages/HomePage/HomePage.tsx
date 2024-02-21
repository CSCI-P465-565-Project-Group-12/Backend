import { useNavigate } from "react-router";
import AllEvents from "../../components/AllEvents/AllEvents";
import RecentEventCard from "../../components/RecentEventCard/RecentEventCard";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import UpcomingEventsCarousel from "../../components/UpcomingEventsCarousel/UpcomingEventsCarousel";
// import { events } from "../../dummyData";
import "./HomPage.css";
import { useSelector } from "react-redux";
import { IEvent } from "../../IEventInterface";

const HomePage = () => {
  const navigate = useNavigate();
  const events = useSelector((state: any) => state.events.events);
  const upcomingEvents = events
    .filter(
      (event: IEvent) => new Date(event.date).getTime() < new Date().getTime()
    )
    .slice(0, 2);
  const recentEvent = events
    .filter(
      (event: IEvent) => new Date(event.date).getTime() > new Date().getTime()
    )
    .slice(0, 1);

  const uniqueVenues = events
    .filter((a: IEvent, b: IEvent) => events.indexOf(a) === b)
    .map((event: IEvent) => event.venue);

  const stats: any = {
    noOfAttendees: 90,
    noOfEvents: events.length,
    noOfVenues: uniqueVenues.length,
    noOfBookings: 90,
    revenue: `${(events.length * 100).toLocaleString()}$`,
  };
  return (
    <div className="home-page-container">
      <HomePageLayoutCards width="50%" height="50%">
        <UpcomingEventsCarousel events={upcomingEvents} />
      </HomePageLayoutCards>
      <HomePageLayoutCards width="30%" height="50%">
        <RecentEventCard {...recentEvent[0]} />
      </HomePageLayoutCards>
      <HomePageLayoutCards width="10%" height="50%">
        <i className="bi bi-person-badge-fill" />
        <i
          className="bi bi-plus-circle-fill"
          onClick={() => navigate("/create-event")}
        />
        <i className="bi bi-pencil-square" />
        <i className="bi bi-trash" />
      </HomePageLayoutCards>
      <HomePageLayoutCards width="20%" height="100%">
        <div
          className="stats-header"
          style={{
            backgroundColor: "#161b33",
            width: "100%",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Statistics</h2>
        </div>
        <div className="stats">
          <h2>Attendees</h2>
          <p>{stats.noOfAttendees}</p>
          <h2>Events</h2>
          <p>{stats.noOfEvents}</p>
          <h2>Venues</h2>
          <p>{stats.noOfVenues}</p>
          <h2>Bookings</h2>
          <p>{stats.noOfBookings}</p>
          <h2>Revenue</h2>
          <p>{stats.revenue}</p>
        </div>
      </HomePageLayoutCards>
      <HomePageLayoutCards width="70%" height="100%">
        <AllEvents events={events} />
      </HomePageLayoutCards>
    </div>
  );
};
export default HomePage;
