import React, { useState, useEffect } from "react";
import {Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";


const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const mapToCalendar = (trainings) => {
    return trainings.map((training) => ({
      title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} `,
      start: new Date(training.date),
      end: moment(training.date)
        .add(training.duration, 'minutes')
        .toDate(),
    }));
  };

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
      if (!response.ok) {
        throw new Error("Error in fetch: " + response.statusText);
      }
      const data = await response.json();
      setCalendarEvents(mapToCalendar(data));
    } catch (error) {
      console.error("Error fetching trainings: ", error.message);
    }
  };





  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default TrainingCalendar;
