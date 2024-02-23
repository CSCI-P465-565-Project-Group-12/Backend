import { useDispatch, useSelector } from "react-redux";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import "./UpdateEventPage.css";
import { IEvent } from "../../IEventInterface";
import { useState } from "react";
import { updateEventActions } from "../../store/update-event-store";
import { useNavigate } from "react-router";
const UpdateEventPage = () => {
  const retrievedEvent: IEvent = useSelector(
    (state: any) => state.updateEvents
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newEventData, setNewEventData] = useState<IEvent>({
    title: retrievedEvent.title,
    date: retrievedEvent.date,
    time: retrievedEvent.time,
    venue: retrievedEvent.venue,
    description: retrievedEvent.description,
    image: retrievedEvent.image,
  });
  console.log(retrievedEvent);
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateEventActions.updateEventDetails(newEventData));
    alert("Event updated successfully");
    navigate("/");
  };
  return (
    <div className="update-event-page-container">
      <div className="back-btn">
        <i className="bi bi-arrow-left-circle-fill" />
      </div>
      {retrievedEvent.title === "" ? (
        <h1>Something went wrong</h1>
      ) : (
        <>
          <HomePageLayoutCards width="40%" height="100%">
            <div className="create-event-form">
              <form>
                <div className="form-control">
                  <label htmlFor="event-name">Event Name</label>
                  <input
                    type="text"
                    id="event-name"
                    value={newEventData.title}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="event-date">Event Date</label>
                  <input
                    type="date"
                    id="event-date"
                    value={newEventData.date}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        date: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="event-time">Event Time</label>
                  <input
                    type="time"
                    id="event-time"
                    value={newEventData.time}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        time: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="event-venue">Event Venue</label>
                  <input
                    type="text"
                    id="event-venue"
                    value={newEventData.venue}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        venue: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="event-description">Event Description</label>
                  <textarea
                    id="event-description"
                    value={newEventData.description}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control">
                  <button onClick={(e) => submitHandler(e)}>
                    Update Event
                  </button>
                </div>
              </form>
            </div>
          </HomePageLayoutCards>
          <HomePageLayoutCards width="40%" height="100%">
            <div className="event-preview">
              <h2>Event Preview</h2>
              <div className="event-preview-image">
                <img src={newEventData.image} alt="event" />
              </div>
              <div className="event-preview-details">
                <h3>{newEventData.title}</h3>
                <p>{newEventData.date}</p>
                <p>{newEventData.time}</p>
                <p>{newEventData.venue}</p>
                <p>{newEventData.description}</p>
              </div>
            </div>
          </HomePageLayoutCards>
        </>
      )}
    </div>
  );
};
export default UpdateEventPage;
