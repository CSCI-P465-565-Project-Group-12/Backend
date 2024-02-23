import { useNavigate } from "react-router";
import "./CreateEventPage.css";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import { useState } from "react";
import { IEvent } from "../../IEventInterface";
import { useDispatch } from "react-redux";
import { eventsActions } from "../../store/events-store";

const CreateEventPage = () => {
  const [event, setEvent] = useState<IEvent>({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(eventsActions.addEvent(event));
    navigate("/");
  };
  return (
    <div className="create-event-page-container">
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="bi bi-arrow-left-circle-fill" />
      </div>
      {/* <div className="create-event-form"></div> */}
      <HomePageLayoutCards width="40%" height="100%">
        <div className="create-event-form">
          <form>
            <div className="form-control">
              <label htmlFor="event-name">Event Name</label>
              <input
                type="text"
                id="event-name"
                onChange={(e) => {
                  setEvent({ ...event, title: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="event-date">Event Date</label>
              <input
                type="date"
                id="event-date"
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="event-time">Event Time</label>
              <input
                type="time"
                id="event-time"
                onChange={(e) => {
                  setEvent({ ...event, time: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="event-venue">Event Venue</label>
              <input
                type="text"
                id="event-venue"
                onChange={(e) => {
                  setEvent({ ...event, venue: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="event-description">Event Description</label>
              <textarea
                id="event-description"
                onChange={(e) => {
                  setEvent({ ...event, description: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="event-image">Event Image</label>
              <input
                type="file"
                id="event-image"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        setEvent({ ...event, image: reader.result });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div className="form-control">
              <button onClick={(e) => submitHandler(e)}>Create Event</button>
            </div>
          </form>
        </div>
      </HomePageLayoutCards>
      <HomePageLayoutCards width="40%" height="100%">
        <div className="event-preview">
          <h2>Event Preview</h2>
          <div className="event-preview-content">
            <div className="event-preview-image">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="event-preview-details">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.venue}</p>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </HomePageLayoutCards>
    </div>
  );
};
export default CreateEventPage;
