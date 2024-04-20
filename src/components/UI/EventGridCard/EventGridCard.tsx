import { IEvent } from "../../../IEvent";
import "./EventGridCard.css";

const EventGridCard: React.FC<IEvent> = (props) => {
  let date = new Date(props.startTime).toLocaleString();
  return (
    <div className="event-grid-card">
      <div className="event-grid-card-image">
        <img src={props.coverImg} alt="Event Title" />
      </div>
      <div className="event-grid-card-content">
        <h3 className="event-grid-card-title">{props.name}</h3>
        <p className="event-grid-card-date">{date}</p>
      </div>
    </div>
  );
};
export default EventGridCard;
