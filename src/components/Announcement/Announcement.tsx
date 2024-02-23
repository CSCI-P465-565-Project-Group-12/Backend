import { events } from "../../dummyData";
import "./Announcement.css";

const Announcement: React.FC = () => {
  return (
    <div className="announcement-container">
      <div className="header">
        <div className="announcement-icon">
          <i className="bi bi-megaphone-fill" />
        </div>
        <div className="announcement-heading">
          <h1>Make Announcements</h1>
        </div>
      </div>
      <div className="announcement-body">
        <label htmlFor="selectEvent">Select Event for announcement</label>
        <select name="selectEvent" id="selectEvent">
          {events.map((event, index) => {
            return (
              <option key={index} value={event.title}>
                {event.title}
              </option>
            );
          })}
        </select>
        <label htmlFor="announcement">Announcement</label>
        <textarea name="announcement" id="announcement" />
        <button>Create Announcement</button>
      </div>
    </div>
  );
};
export default Announcement;
