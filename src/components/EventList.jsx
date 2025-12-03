import "./EventList.css";
function EventList({ isAdmin, events = [], onBookEvent, onDeleteEvent, isEventBooked, apiFailed, role }) {
  return (
    <div className="event-list">
      {events.map(e => (
        <div className="event-card" key={e.id}>
          <div className="event-title">{e.name}</div>
          <div className="event-date">{e.date}</div>
          <div className="event-location">{e.location}</div>
          <div className="event-description">{e.description}</div>
          <div>
            <strong>{e.availableSeats}</strong>
          </div>
          {!isAdmin && !apiFailed && role === "USER" && (
            isEventBooked(e.id)
              ? <button className="book-btn" disabled>Already Booked</button>
              : <button className="book-btn" disabled={e.availableSeats < 1} onClick={() => onBookEvent(e.id)}>
                  {e.availableSeats > 0 ? "Book" : "Sold Out"}
                </button>
          )}
          {isAdmin && !apiFailed && (
            <button className="delete-btn"
              onClick={() => {
                if (window.confirm("Do you want to remove this Event ?")) {
                  onDeleteEvent(e.id)
                }
              }}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
export default EventList;