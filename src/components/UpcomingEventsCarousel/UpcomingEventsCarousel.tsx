import { useState } from "react";
import "./UpcomingEventsCarousel.css";
import { IEvent, IEvents } from "../../IEvent";

const UpcomingEventsCarousel: React.FC<IEvents> = (props) => {
  const [currentEvent, setCurrentEvent] = useState(0);

  return (
    <div className="upcoming-events-carousel">
      {props.events.length < 0 ? (
        <h2>No Upcoming Events</h2>
      ) : (
        props.events
          .filter((_, index: number) => {
            return index === currentEvent;
          })
          .map((event: IEvent) => {
            let date = new Date(event.startTime).toLocaleString();
            return (
              <div key={event.name} className="carousel-inner">
                <img src={event.coverImg} alt={event.name} />
                <div className="carousel-text">
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      backgroundColor: "#161b33",
                      width: "100%",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <p>{date}</p>
                  </div>
                  <h1>{event.name}</h1>
                </div>
              </div>
            );
          })
      )}
      <div className="navigation-btns">
        {props.events.map((event: IEvent, index: number) => (
          <span
            key={event.name}
            className="carousel-btn"
            onClick={() => setCurrentEvent(index)}
          >
            <i
              className={
                index === currentEvent ? "bi bi-circle-fill" : "bi bi-circle"
              }
            />
          </span>
        ))}
      </div>
    </div>
  );
};
export default UpcomingEventsCarousel;
