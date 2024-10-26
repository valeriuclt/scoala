"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField"; 
import { attendanceSchema, AttendanceSchema, } from "@/lib/formValidationSchema";
import { createAttendance,  updateAttendance,  } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AttendanceForm = ({
  type,  data,  setOpen,  relatedData
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?:any;
}) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema),
  });

//  AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState( type === "create" ? createAttendance : updateAttendance,{
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log('Attendance', data); 
    formAction(data)
  });

const router = useRouter();

  useEffect(() => {
    if (state.success) {

      toast(`Prezenta a fost ${type === "create" ? "notata" : "schimbata"} !`)
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

const { resultS, resultL } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new attendance":"Update the attendance"}</h1>
      
      <div className="flex justify-between flex-wrap gap-4">

        <InputField
          label="data"
          name="date" 
          defaultValue={data?.date.toISOString().split("T")[0]}
          register={register}
          error={errors?.date}
          type="date"
        />
    
       
       
       {data && <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />
       } 
    <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select 
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            defaultValue={data?.resultS}
          >
            {resultS.map(
              (student: { id: number; name: string; surname:string }) => (
                <option value={student.id} key={student.id}>
                  {student.name } {student.surname}
                </option>
              )
            )
            } 
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>
       
     
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Lesson</label>
          <select 
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId",  { valueAsNumber: true })}
            // {...register("lessonId")}
            defaultValue={data?.subjects}
          >
            {resultL.map(
              (lesson: { id: number; name: string; }) => (
                <option 
                value={lesson.id} key={lesson.id} 
                >
                  {lesson.name} 
                </option>
              )
            )
            } 
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="prezenta"
          name="present" 
          defaultValue={data?.present}
          register={register}
          error={errors?.present}
          type="checkbox"
        />
        </div>
     {state.error && <span className="text-red-800">Ceva nu a functionat cum trebuie..</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm ;
 


