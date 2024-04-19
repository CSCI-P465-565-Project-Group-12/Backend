import { useNavigate } from "react-router";
// import AllEvents from "../../components/AllEvents/AllEvents";
// import RecentEventCard from "../../components/RecentEventCard/RecentEventCard";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
// import UpcomingEventsCarousel from "../../components/UpcomingEventsCarousel/UpcomingEventsCarousel";
// import { events } from "../../dummyData";
import "./HomPage.css";
// import { IEvent } from "../../IEvent";
// import Announcement from "../../components/Announcement/Announcement";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-store";
import { venueOwnerActions } from "../../store/venue-owner-store";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venueOwner = useSelector((state: any) => state.venueOwner.venue_owner);
  console.log(venueOwner);
  const isLoggenIn = useSelector((state: any) => state.login.isLoggedIn);

  // const upcomingEvents = events
  //   .filter((event) => new Date(event.date).getTime() < new Date().getTime())
  //   .slice(0, 2);
  // const recentEvent = events
  //   .filter((event) => new Date(event.date).getTime() > new Date().getTime())
  //   .slice(0, 1);

  // const uniqueVenues = events.filter(
  //   (event, index: number, self) =>
  //     index === self.findIndex((e) => e.venue === event.venue)
  // );

  // const stats: any = {
  //   noOfAttendees: 90,
  //   noOfEvents: events.length,
  //   noOfVenues: uniqueVenues.length,
  //   noOfBookings: 90,
  //   revenue: `${(events.length * 100).toLocaleString()}$`,
  // };
  return (
    <>
      {isLoggenIn ? (
        <>
          <div className="welcome-header">
            <h1>Welcome, {venueOwner.username}</h1>
          </div>
          <div className="home-page-container">
            {/* <HomePageLayoutCards width="50%" height="50%">
              <UpcomingEventsCarousel events={upcomingEvents} />
            </HomePageLayoutCards>
            <HomePageLayoutCards width="30%" height="50%">
              <RecentEventCard {...recentEvent[0]} />
            </HomePageLayoutCards> */}
            <HomePageLayoutCards width="10%" height="50%">
              <i
                className="bi bi-person-badge-fill"
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <i
                className="bi bi-building-fill-add"
                onClick={() => {
                  navigate("/create-venue");
                }}
              />
              <i
                className="bi bi-plus-circle-fill"
                onClick={() => navigate("/create-event")}
              />
              {/* <i
                className="bi bi-list-ul"
                onClick={() => navigate("/all-events")}
              /> */}

              <i
                className="bi bi-building"
                onClick={() => navigate("/all-venues")}
              />
              <i
                className="bi bi-box-arrow-right"
                onClick={() => {
                  dispatch(loginActions.logout());
                  dispatch(venueOwnerActions.unSetVenueOwner());
                  dispatch(venueOwnerActions.unSetVenueOwnerProfile());

                  window.location.href = import.meta.env
                    .VITE_MAIN_CLIENT as string;
                }}
              />
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
              {/* <div className="stats">
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
              </div> */}
            </HomePageLayoutCards>
            {/* <HomePageLayoutCards width="70%" height="100%">
              <AllEvents events={events} />
            </HomePageLayoutCards> */}
            {/* <HomePageLayoutCards width="100%" height="auto">
              <Announcement />
            </HomePageLayoutCards> */}
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <h1>Please login to view this page</h1>
      )}
    </>
  );
};
export default HomePage;
