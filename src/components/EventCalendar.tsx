"use client";
 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString('en-US')}`);
      // router.push(`?date=${value}`);
    }
  }, [value, router]);
  return  <Calendar onChange={onChange} value={value}/>
    // <div className="bg-white p-4 rounded-md">
    //   <Calendar onChange={onChange} value={value} />
    //   <div className="flex items-center justify-between">
    //     <h1 className="text-xl font-semibold my-4">Events</h1>
    //     <Image src="/moreDark.png" alt="" width={20} height={20} />
    //   </div>
      // <div className="flex flex-col gap-2">
      //   {events.map((event) => (
      //     <div
      //       className="p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      //       key={event.id}
      //     >
      //       <div className="flex items-center justify-between">
      //         <h1 className="font-semibold text-gray-600">{event.title}</h1>
      //         <span className="text-gray-300 text-xs">{event.time}</span>
      //       </div>
      //       <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
      //     </div>
      //   ))}
      // </div>
    // </div>
  
};

export default EventCalendar;