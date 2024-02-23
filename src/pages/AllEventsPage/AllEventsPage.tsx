import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import Table from "../../components/UI/Table/Table";
import { events } from "../../dummyData";
import "./AllEventsPage.css";
const AllEventsPage = () => {
  return (
    <div className="all-events-page-container">
      <HomePageLayoutCards width="90%" height="100%">
        <div className="all-events-header">
          <h1>All Events</h1>
        </div>
        <Table
          columns={["Event Name", "Date", "Venue", "Time"]}
          data={events}
        />
      </HomePageLayoutCards>
    </div>
  );
};
export default AllEventsPage;
