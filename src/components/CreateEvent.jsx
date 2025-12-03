import { useState } from "react";
import "./CreateEventForm.css";
function CreateEvent({ addNewEvent }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    availableSeats: 0
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date.trim() || !form.location.trim() ||
      !form.description.trim() || Number(form.availableSeats) <= 0) {
      alert("Not all fields are populated.");
      return;
    }
    addNewEvent({ ...form, availableSeats: Number(form.availableSeats) });
    setForm({
      name: "",
      description: "",
      location: "",
      date: "",
      availableSeats: 0
    });
  }
  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter name" />
      <input name="date" type="date" value={form.date} onChange={handleChange} placeholder="Enter date" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter description" rows={2} />
      <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="Enter location" rows={2} />
      <input name="availableSeats" type="number" value={form.availableSeats} onChange={handleChange} placeholder="Enter available seats for event" min={1} />
      <button className="create-event-form" type="submit">Add Event</button>
    </form>
  );
}
export default CreateEvent;