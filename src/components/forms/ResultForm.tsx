"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import { resultSchema, ResultSchema, } from "@/lib/formValidationSchema";
import { createResult, updateResult, } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const ResultForm = ({
  type, data, setOpen, relatedData
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
  });

  //  AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(type === "create" ? createResult : updateResult, {
    success: false,
    error: false,
  }
  );

  const onSubmit = handleSubmit((data) => {
    console.log('Assignment', data);
    formAction(data)
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {

      toast(`Rezultatul a fost ${type === "create" ? "creat" : "schimbat"} !`)
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { resultsE, resultsA, resultsS } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new Result" : "Update the Result"}</h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="rezultat"
          name="score"
          defaultValue={data?.score}
          register={register}
          error={errors?.score}
        />

        {data && <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            defaultValue={data?.resultsS}
          >
            {resultsS.map(
              (result: { id: number; name: string; surname: string }) => (
                <option value={result.id} key={result.id}>
                  {result.name} {result.surname}
                </option>
              )
            )
            }
          </select>
          {errors.assignmentId?.message && (
            <p className="text-xs text-red-400">
              {errors.assignmentId.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">assignment</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("examId")}
            defaultValue={data?.resultsE}
          >
            {resultsE.map(
              (result: { id: number; title: string; }) => (
                <option value={result.id} key={result.id}>
                  {result.title}
                </option>
              )
            )
            }
          </select>
          {errors.examId?.message && (
            <p className="text-xs text-red-400">
              {errors.examId.message.toString()}
            </p>
          )}
        </div>


        <InputField
          label="Assignment"
          name="resultsA"
          defaultValue={data?.resultsA}
          register={register}
          // error={errors?.assignmentId?.message?.toString()}
          error={errors?.assignmentId}
        />



      </div>
      {state.error && <span className="text-red-800">Ceva nu a functionat cum trebuie..</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;


