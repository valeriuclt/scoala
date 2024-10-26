"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField"; 
import { announcementSchema, AnnouncementSchema, } from "@/lib/formValidationSchema";
import { createAnnouncement,  updateAnnouncement  } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AnnouncementForm = ({
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
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

//  AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState( type === "create" ? createAnnouncement : updateAnnouncement,{
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log('Announcement', data); 
    formAction(data)
  });

const router = useRouter();

  useEffect(() => {
    if (state.success) {

      toast(`Anuntul a fost ${type === "create" ? "creat" : "schimbat"} !`)
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

const { classess } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new announcement":"Update the announcement"}</h1>
      
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Announcement title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Announcement description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        
        <InputField
          label="Date"
          name="date" 
          defaultValue={data?.date.toISOString().split("T")[0]}
          register={register}
          error={errors.date}
          // type="datetime-local"
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
          <label className="text-xs text-gray-500">Class</label>
          <select 
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classess}
          >
            {classess.map(
              (classes: { id: number; name: string; }) => (
                <option value={classes.id} key={classes.id}>
                  {classes.name } 
                </option>
              )
            )
            } 
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
      </div>
     {state.error && <span className="text-red-800">Ceva nu a functionat cum trebuie..</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm ;


