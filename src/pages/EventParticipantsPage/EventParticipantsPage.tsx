import { useLocation, useNavigate } from "react-router";
import "./EventParticipantsPage.css";
import useApi from "../../hooks/apiHook";
import { useEffect, useState } from "react";
import Chat from "../../components/Chat/Chat";
import { useSelector } from "react-redux";

interface IReservation {
  id: string;
  activityId: string;
  userId: string;
  reservationDate: string;
  reservationTime: string;
  reservationStatus: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}
const EventParticipantsPage = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [openChat, setOpenChat] = useState(false);
  const { getActivityReservations, getUser } = useApi();
  const activityId = useLocation().state.event.id;
  const activity = useLocation().state.event;
  const venueOwner = useSelector((state: any) => state.venueOwner.venue_owner);
  // console.log(venueOwner);

  const navigate = useNavigate();
  useEffect(() => {
    getActivityReservations(activityId).then((res) => {
      console.log(res);
      setReservations(res);
    });
  }, []);
  useEffect(() => {
    reservations.forEach((reservation) => {
      getUser(reservation.userId).then((res) => {
        reservation.user = {
          id: res.id,
          username: res.username,
          email: res.email,
        };
        setReservations([...reservations]);
        console.log(reservations);
      });
    });
  }, [reservations.length > 0]);

  return (
    <div className="event-participants-page-container">
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="bi bi-arrow-left-circle-fill" />
      </div>
      <h1>Event Participants Page</h1>
      <div className="participants-container">
        {reservations.length < 0 ? (
          <>
            <h1
              style={{
                color: "#161b33",
              }}
            >
              No reservations for this event
            </h1>
          </>
        ) : (
          reservations.map((reservation) => {
            return (
              <>
                <div className="participant-box">
                  <h2>{reservation.user?.username}</h2>
                  <h2>{reservation.user?.email}</h2>
                  <i
                    className="bi bi-chat-left-text"
                    onClick={() => {
                      console.log(
                        `${activity.name}-${reservation.user?.username}`
                      );

                      setOpenChat(true);
                    }}
                  />
                </div>
                {openChat && reservation.user?.username && (
                  <>
                    <Chat
                      key={reservation.user?.id}
                      sender={venueOwner.username as string}
                      event={
                        `${activity.name}-${reservation.user?.id}` as string
                      }
                    />
                    <button>
                      <i
                        className="bi bi-x-lg"
                        onClick={() => {
                          setOpenChat(false);
                        }}
                      />
                    </button>
                  </>
                )}
              </>
            );
          })
        )}
      </div>
    </div>
  );
};
export default EventParticipantsPage;
