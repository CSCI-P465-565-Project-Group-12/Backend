import { IEvent } from "../../../IEvent";
import "./EventGridCard.css";

const EventGridCard: React.FC<IEvent> = (props) => {
  return (
    <div className="event-grid-card">
      <div className="event-grid-card-image">
        <img
          src={props.coverImg}
          alt="Event Title"
          className="event-grid-card-image"
        />
      </div>
      <div className="event-grid-card-content">
        <h3 className="event-grid-card-title">{props.name}</h3>
        <p className="event-grid-card-date">{props.name}</p>
        <p className="event-grid-card-location">{props.name}</p>
        <button className="view-more-btn">View Details</button>
      </div>
    </div>
  );
};
export default EventGridCard;
