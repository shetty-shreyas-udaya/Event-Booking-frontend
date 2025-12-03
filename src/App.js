import React, { useState, useEffect } from "react";
import "./App.css";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import MyBookings from "./components/MyBookings";
import AdminToggle from "./components/AdminToggle";

const API_URL = process.env.REACT_APP_API_URL;
const HARD_CODED_EVENTS = [
  { id: 1, name: "Spring Music Festival", date: "2024-07-15", location: "Central Park", description: "An outdoor celebration of music and culture.", availableSeats: 25 },
  { id: 2, name: "Tech Conference X", date: "2024-08-21", location: "Metro Convention Center", description: "Innovative tech workshops and keynote talks.", availableSeats: 25 },
  { id: 3, name: "Stand-Up Comedy Night", date: "2024-09-10", location: "City Theater", description: "A hilarious evening with top comedians.", availableSeats: 25 },
  { id: 4, name: "Art & Food Expo", date: "2024-10-05", location: "Downtown Exhibition Hall", description: "Explore local art while sampling gourmet foods.", availableSeats: 25 },
  { id: 5, name: "Startup Pitch Day", date: "2024-10-28", location: "Innovation Labs", description: "Watch startups pitch to investors for big prizes.", availableSeats: 25 },
  { id: 6, name: "Annual Charity Marathon", date: "2024-11-12", location: "Riverside Park", description: "Run for a cause and support local charities.", availableSeats: 25 }
];

function App() {
  const [view, setView] = useState("EVENTS");
  const [events, setEvents] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Standalone event fetcher for useEffect
  const fetchEvents = () => {
    fetch(`${API_URL}/events`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setApiFailed(false);
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setApiFailed(true);
        setEvents(HARD_CODED_EVENTS);
      });
  };

  // Fetch events on mount (initial load)
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  // Fetch events anytime view is set to EVENTS
  useEffect(() => {
    if (view === "EVENTS") {
      fetchEvents();
    }
    // eslint-disable-next-line
  }, [view]);

  // Booking fetcher—can be passed as a callback
  const refreshBookings = () => {
    if (jwt && !apiFailed) {
      fetch(`${API_URL}/booking`, { headers: { Authorization: `Bearer ${jwt}` } })
        .then(res => res.ok ? res.json() : [])
        .then(data => setBookings(Array.isArray(data) ? data : []))
        .catch(() => setBookings([]));
    } else {
      setBookings([]);
    }
  };

  // Fetch bookings when jwt/login/api state changes
  useEffect(() => {
    refreshBookings();
    // eslint-disable-next-line
  }, [jwt, apiFailed]);

  // --- Handlers

  function handleUserLogin() {
    if (apiFailed) {
      alert("Backend unavailable.");
      return;
    }
    const userNamePrompt = window.prompt("Enter your username:");
    const passwordPrompt = window.prompt("Enter your password:");
    if (!userNamePrompt || !passwordPrompt) return;
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: userNamePrompt, password: passwordPrompt })
    })
      .then(res => res.ok ? res.json() : Promise.reject("Login failed"))
      .then(data => {
        setJwt(data.token);
        setRole(data.role);
        setUserName(data.userName);
        setView("EVENTS");
        alert(`Welcome, ${data.userName}`);
        refreshBookings();
      })
      .catch(e => alert(e));
  }

  function handleLogout() {
    setJwt(null);
    setRole(null);
    setUserName(null);
    setBookings([]);
  }

  function handleCreateEvent(event) {
  fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(event)
  })
    .then(res => {
      if (res.ok) return res.json();
      // If creation fails (eg, duplicate), show server error message
      return res.text().then(msg => { throw new Error(msg || "Event creation failed"); });
    })
    .then(newEvent => setEvents(evts => [...evts, newEvent]))
    .catch(e => alert(e.message));
}

  function handleDeleteEvent(eventId) {
    fetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setEvents(evts => evts.filter(ev => ev.id !== eventId));
      })
      .catch(() => alert("Delete failed"));
  }

  function handleBookEvent(eventId) {
    if (!jwt || apiFailed || role !== "USER") {
      alert("Login as user to book events");
      return;
    }
    if (bookings.some(b => b.eventId === eventId)) {
      alert("You already booked this event");
      return;
    }
    fetch(`${API_URL}/booking`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ eventId })
    })
      .then(res => {
        if (!res.ok) return res.text().then(msg => { throw new Error(msg) });
        return res.json();
      })
      .then(() => {
        refreshBookings();
        fetchEvents();
        alert("Booking successful!");
      })
      .catch(e => alert(e.message));
  }

  function isEventBooked(eventId) {
    return bookings.some(b => b.eventId === eventId);
  }

  const handleResetEvents = () => {
  fetch(`${API_URL}/events/reset-events`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${jwt}` }
  })
    .then(res => res.ok ? res.text() : Promise.reject("Reset failed"))
    .then(() => {
      fetchEvents(); // Refetch to update the event list after reset
      alert("Events reset to original state!");
    })
    .catch(err => alert(err));
};
  return (
    <div className={role === "ADMIN" ? "app-root admin-bg" : "app-root user-bg"}>
      <div className="app-content">
        <div className="header-row">
          <h1 style={{ margin: 0 }}>Event Booking Demo</h1>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
            <AdminToggle
              apiFailed={apiFailed}
              role={role}
              setRole={setRole}
              setJwt={setJwt}
              setUserName={setUserName}
            />
            {jwt && role === "USER" && <button className="logout-btn" onClick={handleLogout}>Logout ({userName})</button>}
            {!jwt && <button className="user-login-btn" onClick={handleUserLogin}>User Login</button>}
          </div>
        </div>
        {apiFailed && (
          <div style={{ color: "red", margin: "1em 0" }}>Backend unavailable. Only event listing is enabled (no booking/admin).</div>
        )}
        <div className="toggle-bar" style={{ margin: "1em 0" }}>
          <button
            className={view === "EVENTS" ? "toggle-active" : ""}
            onClick={() => setView("EVENTS")}
          >Event List</button>
          <button
            className={view === "BOOKINGS" ? "toggle-active" : ""}
            onClick={() => {
              if (jwt && !apiFailed) setView("BOOKINGS");
            }}
            disabled={!jwt || apiFailed}
            style={{
              opacity: (!jwt || apiFailed) ? 0.6 : 1,
              cursor: (!jwt || apiFailed) ? "not-allowed" : "pointer"
            }}
          >My Bookings</button>
        </div>
        {view === "EVENTS" && (
          <>
            {role === "ADMIN" && !apiFailed && (
              <>
                <button
                  className="admin-reset-btn"
                  onClick={handleResetEvents}
                  style={{
                    background: "#ffa726",
                    color: "#fff",
                    marginBottom: "1em",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.6em 2em",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer"
                  }}
                >
                  Reset Events (Demo)
                </button>
                <CreateEvent addNewEvent={handleCreateEvent} />
              </>
            )}
            <EventList
              isAdmin={role === "ADMIN"}
              events={events}
              onBookEvent={handleBookEvent}
              onDeleteEvent={handleDeleteEvent}
              isEventBooked={isEventBooked}
              apiFailed={apiFailed}
              role={role}
            />
          </>
        )}
        {view === "BOOKINGS" && (
          (jwt && !apiFailed) ? (
            <MyBookings
              bookings={bookings}
              events={events}
              jwt={jwt}
              apiUrl={API_URL}
              refreshAfterClear={refreshBookings}
            />
          ) : (
            <div style={{ color: "#888", margin: "1em 0" }}>Login to see your bookings.</div>
          )
        )}
      </div>
    </div>
  );
}

export default App;