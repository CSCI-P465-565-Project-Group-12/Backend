import { IEvent } from "../../IEvent";
import "./RecentEventCard.css";
const RecentEventCard: React.FC<IEvent> = (props) => {
  // let date = new Date(props.startTime).toLocaleString();
  console.log("props", props);
  const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
  };
  return isEmptyObject(props) ? (
    <h1>No Recent Event</h1>
  ) : (
    <>
      <div className="recent-event-card-container">
        <div className="vertical-header">
          <h2>Recent Event</h2>
        </div>
        <div className="recent-event-card">
          <div className="recent-event-card__image">
            <img src={props.coverImg} alt={props.name} />
          </div>
          <div className="recent-event-card__info">
            <h2>{props.name}</h2>
            {/* <p>{date}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default RecentEventCard;
