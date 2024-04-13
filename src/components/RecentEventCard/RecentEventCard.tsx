import { IEvent } from "../../IEvent";
import "./RecentEventCard.css";
const RecentEventCard: React.FC<IEvent> = (props) => {
  return (
    <div className="recent-event-card-container">
      <div className="vertical-header">
        <h1>Recent Event</h1>
      </div>
      <div className="recent-event-card">
        <div className="recent-event-card__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="recent-event-card__info">
          <h2>{props.title}</h2>
          <p>{props.date}</p>
        </div>
      </div>
    </div>
  );
};
export default RecentEventCard;
