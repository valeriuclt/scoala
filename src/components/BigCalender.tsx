
"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  // const [view, setView] = useState<View>(Views.WORK_WEEK);

  // const handleOnChangeView = (selectedView: View) => {
  //   setView(selectedView);
  // };

  const [view, setView] = useState<View>(Views.WEEK);

  // const formattedEvents = data?.map(event => ({
  //   ...event,
  //   start: new Date(event.start),
  //   end: new Date(event.end)
  // }));

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // const allDates = formattedEvents.flatMap(event => [event.start, event.end]);
  // const minTime = new Date(Math.min(...allDates.map(date => date.getTime())));
  // const minHour = new Date(0, 0, 0, 7, 0, 0);
  // const maxHour = new Date(0, 0, 0, 18, 0, 0);

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["week","work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
    // <>
    // <Calendar
    // localizer={localizer}
    // events={data}
    // startAccessor="start"
    // endAccessor="end"
    // views={["week", "work_week", "day"]}
    // view={view}
    // style={{ height: '100%' }}
    // onView={handleOnChangeView}
    // defaultDate={minTime}
    // min={minHour}
    // max={maxHour}
    // toolbar={true}
    // formats={{
    //   weekdayFormat: (date: Date, culture: string, localizer: any) =>
    //     localizer.format(date, 'dddd', culture),
    //   dayFormat: (date: Date, culture: string, localizer: any) =>
    //     localizer.format(date, 'DD', culture),
    //   dayHeaderFormat: (date: Date, culture: string, localizer: any) =>
    //     localizer.format(date, 'dddd DD/MM', culture),
    // }}
    // messages={{
    //   week: 'Săptămână',
    //   work_week: 'Săptămână de lucru',
    //   day: 'Zi',     
    //   previous: 'Înapoi',
    //   next: 'Înainte',
    //   today: 'Azi',
      
    // }}
    // eventPropGetter={(event, start, end, isSelected) => ({
    //   style: {
    //     minHeight: '30px'
    //   }
    // })}
    // onSelectEvent={(event) => console.log('Event selected:', event)}
    // />
    // </>
  );
};

export default BigCalendar;


