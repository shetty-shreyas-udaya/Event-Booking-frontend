import "./MyBooking.css";

function MyBookings({ bookings, events, jwt, apiUrl, refreshAfterClear }) {
  // Handles clearing all current user's bookings
  const handleClear = () => {
    if (!jwt) return;
    fetch(`${apiUrl}/booking/reset`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${jwt}` }
    })
      .then(res => res.ok ? res.text() : Promise.reject("Failed to clear bookings"))
      .then(() => {
        alert("Your bookings have been cleared.");
        if (typeof refreshAfterClear === "function") {
          refreshAfterClear();
        }
      })
      .catch(e => alert(e));
  };

  return (
    <div className="my-bookings-card">
      <h2>My Bookings ({bookings && bookings.length > 0 ? bookings.length : 0})</h2>
      {(!bookings || !Array.isArray(bookings) || bookings.length === 0) ? (
        <p>You have not booked any events yet.</p>
      ) : (
        <>
          <ul>
            {bookings.map(b => {
              const event = events.find(ev => ev.id === b.eventId);
              return (
                <li key={b.id}>
                  <strong>{event ? event.name : "Event deleted"}</strong>
                  {event && <> — {event.date}, {event.location}</>}
                </li>
              );
            })}
          </ul>
          <button onClick={handleClear}>
            Clear My Bookings
          </button>
        </>
      )}
    </div>
  );
}

export default MyBookings;