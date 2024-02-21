import { useState } from "react";
import "./UpcomingEventsCarousel.css";
import { IEvent, IEvents } from "../../IEventInterface";

const UpcomingEventsCarousel: React.FC<IEvents> = (props) => {
  const [currentEvent, setCurrentEvent] = useState(0);

  return (
    <div className="upcoming-events-carousel">
      {props.events
        .filter((_, index: number) => {
          return index === currentEvent;
        })
        .map((event: IEvent) => (
          <div key={event.title} className="carousel-inner">
            <img src={event.image} alt={event.title} />
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
                <p>
                  {event.date} at {event.venue}
                </p>
              </div>
              <h1>{event.title}</h1>
            </div>
          </div>
        ))}
      <div className="navigation-btns">
        {props.events.map((event: IEvent, index: number) => (
          <span
            key={event.title}
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
