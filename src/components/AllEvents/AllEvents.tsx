import { IEvents } from "../../IEventInterface";
import EventGridCard from "../UI/EventGridCard/EventGridCard";
import "./AllEvents.css";
const AllEvents: React.FC<IEvents> = (props) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Events</h1>
      <div className="all-events-container">
        {props.events.map((event, index) => {
          return <EventGridCard key={index} {...event} />;
        })}
      </div>
      ;
    </>
  );
};
export default AllEvents;
