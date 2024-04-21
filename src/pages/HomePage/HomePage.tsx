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
import { useEffect, useState } from "react";
import useApi from "../../hooks/apiHook";
import { IEvent } from "../../IEvent";
import RecentEventCard from "../../components/RecentEventCard/RecentEventCard";
import UpcomingEventsCarousel from "../../components/UpcomingEventsCarousel/UpcomingEventsCarousel";
import AllEvents from "../../components/AllEvents/AllEvents";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
import { loadingActions } from "../../store/loading-store";

const HomePage = () => {
  const [venueOwnerEvents, setVenueOwnerEvents] = useState<any[]>([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const { getAllVenues, fetchProfile, getAllEvents } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venueOwner = useSelector((state: any) => state.venueOwner.venue_owner);
  const venueOwnerProfile = useSelector((state: any) => state.venueOwner);

  // console.log(venueOwner);
  const isLoggenIn = useSelector((state: any) => state.login.isLoggedIn);

  // set timer of token expiry of 1hr
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Session expired, please login again");
      dispatch(loginActions.logout());
      dispatch(venueOwnerActions.unSetVenueOwner());
      dispatch(venueOwnerActions.unSetVenueOwnerProfile());
      window.location.href = import.meta.env.VITE_MAIN_CLIENT as string;
    }, 3600000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    dispatch(loadingActions.setLoading({ isLoading: true, message: "" }));
    fetchProfile(venueOwner.username).then((res) => {
      dispatch(venueOwnerActions.setVenueOwnerProfile(res));
      console.log(venueOwnerProfile);
    });
    getAllVenues().then((res) => {
      res
        .filter((venue: IVenue) => {
          let details = JSON.parse(venue.details as any);
          return details.eventOrganizer.includes(venueOwnerProfile.first_name);
        })
        .map((venue: IVenue) => {
          console.log(venue);
          setVenues((prev) => [...prev, venue]);
        });
    });
  }, []);

  useEffect(() => {
    getAllEvents().then((res) => {
      console.log(res);
      res
        .filter((event: IEvent) => {
          return venues.some((venue) => venue.id === event.venueId);
        })
        .map((event: IEvent) => {
          console.log(event);
          setVenueOwnerEvents((prev) => [...prev, event]);
        });
    });
    dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
  }, [venues.length > 0]);

  const upcomingEvents = venueOwnerEvents.filter((event) => {
    // console.log("event", event);
    return new Date(event.startTime).getTime() > new Date().getTime();
  });
  console.log("upcomingEvents", upcomingEvents);

  const recentEvent = venueOwnerEvents.filter((event) => {
    return new Date(event.startTime).getTime() < new Date().getTime();
  });

  const stats: any = {
    noOfAttendees: 20,
    noOfEvents: venueOwnerEvents.length,
    noOfVenues: venues.length,
    noOfBookings: 10,
    revenue: `${(venueOwnerEvents.length * 100).toLocaleString()}$`,
  };
  return (
    <>
      {isLoggenIn ? (
        <>
          <div className="welcome-header">
            <h1>Welcome, {venueOwner.username}</h1>
          </div>
          <div className="home-page-container">
            <HomePageLayoutCards width="50%" height="50%">
              <UpcomingEventsCarousel events={upcomingEvents} />
            </HomePageLayoutCards>

            <HomePageLayoutCards width="30%" height="50%">
              <RecentEventCard {...recentEvent[0]} />
            </HomePageLayoutCards>

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
              <AllEvents events={venueOwnerEvents} />
            </HomePageLayoutCards>
            {/* <HomePageLayoutCards width="100%" height="auto">
              <Announcement />
            </HomePageLayoutCards> */}
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "2rem",
          }}
        >
          <h1>Please login to view this page</h1>
          <button
            onClick={() => {
              window.location.href = import.meta.env.VITE_MAIN_CLIENT as string;
            }}
          >
            Login
          </button>
        </div>
      )}
      <LoadingModal message="Loading your venues & events..." />
    </>
  );
};
export default HomePage;
