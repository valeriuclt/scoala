import { createParent, updateParent } from "@/lib/actions";
import { parentSchema, ParentSchema } from "@/lib/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../InputField";

const ParentForm = ({
  type, data, setOpen, relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {

  const { register, handleSubmit, formState: { errors }, } = useForm<ParentSchema>({ resolver: zodResolver(parentSchema), });

  const [state, formAction] = useFormState(
    type === "create" ? createParent : updateParent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data)
  })

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Parent has been ${type === "create" ? "created" : "updated"}!`)
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  // const { students } = relatedData;



  return (
    <form className="flex flex-col gap-8  " onSubmit={onSubmit}>
      {/* <div className=" "> */}
      <h1>{type === "create" ? "Create a new parent" : "Update the parent"} </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="user name" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
        {data && <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />}
       

        <InputField label="name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />
        <InputField label="surname" name="surname" defaultValue={data?.surname} register={register} error={errors?.surname} />
        <InputField label="email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="phone" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} />
        <InputField label="address" name="address" defaultValue={data?.address} register={register} error={errors?.address} />
         
        </div>
      
      {state.error && <span className="text-red-800">Ceva nu a functionat cum trebuie..</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
      {/* </div> */}
    </form>
  )
}
export default ParentForm