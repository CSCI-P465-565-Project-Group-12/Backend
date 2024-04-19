import { useNavigate } from "react-router";
import "./Table.css";
import { useDispatch } from "react-redux";
import { updateEventActions } from "../../../store/update-event-store";

interface ITableProps {
  columns: string[];
  data: any[];
  allEvents: any[];
}

const Table: React.FC<ITableProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToUpdateEventPageHandler = () => {
    navigate("/update-event");
  };
  return (
    <div className="table-container">
      {props.data.length === 0 ? (
        <h1>No Events</h1>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                {props.columns.length > 0 &&
                  props.columns.map((column: any, index: number) => (
                    <th key={index}>{column}</th>
                  ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.data.length > 0 &&
                props.data.map((event: any, index: number) => (
                  <tr key={index}>
                    {Object.keys(event).map((key: any, index: number) => (
                      <td key={index}>
                        {key === "date"
                          ? new Date(event[key]).toDateString()
                          : event[key]}
                      </td>
                    ))}
                    <td>
                      <i
                        className="bi bi-people-fill"
                        onClick={() => {
                          console.log("event", props.allEvents[index]);

                          navigate("/event-participants", {
                            state: { event: props.allEvents[index] },
                          });
                        }}
                      />
                      <i
                        className="bi bi-pencil-square"
                        onClick={() => {
                          dispatch(
                            updateEventActions.updateEventDetails(
                              props.allEvents[index]
                            )
                          );
                          navigateToUpdateEventPageHandler();
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
        </>
      )}
    </div>
  );
};
export default Table;
