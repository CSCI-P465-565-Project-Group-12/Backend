import { useNavigate } from "react-router";
import "./Table.css";
import { useDispatch } from "react-redux";

interface ITableProps {
  columns: string[];
  displayData: any[];
  data: any;
}

const VenuesTable: React.FC<ITableProps> = (props) => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const mappedIds = props.data.map((venue: any) => venue.id);
  console.log("mappedIds", mappedIds);

  const navigateToUpdateVenuePageHandler = (name: string) => {
    let clickedVenue = props.data.find((venue: any) => venue.name === name);

    navigate("/update-venue", { state: { venue: clickedVenue } });
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {props.columns.map((column: any, index: number) => (
              <th key={index}>{column}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.displayData.map((event: any, index: number) => (
            <tr key={index}>
              {Object.keys(event).map((key: any, index: number) => (
                <td key={index}>{event[key]}</td>
              ))}
              <td>
                <i
                  className="bi bi-list-ul"
                  onClick={() =>
                    navigate("/all-events", {
                      state: { venueId: mappedIds[index] },
                    })
                  }
                />
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    // dispatch(updateEventActions.storeTemporaryEvent(event));
                    navigateToUpdateVenuePageHandler(event.name);
                  }}
                />
                <i
                  className="bi bi-trash"
                  onClick={() => {
                    // dispatch(updateEventActions.deleteEvent(event.title));
                    alert("Event deleted successfully");
                    navigate("/");
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default VenuesTable;
