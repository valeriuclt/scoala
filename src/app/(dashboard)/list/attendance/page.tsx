import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import {  Lesson, Prisma, Student } from "@prisma/client";
import Image from "next/image";
 
type AttendanceList = {
  id: number;
  present: boolean;
  title:string;
  studentName:string;
  studentSurname:string;
  className:string;
  date: Date;
}& {
  lesson:Lesson,
student:Student
}


const AttendancePage = async ({ searchParams, }: {
  searchParams: { [key: string]: string | undefined };
}) => {


  const { userId, sessionClaims } = auth()
  const role = (sessionClaims?.metadata as { role?: string })?.role
  const currentUserId = userId;

  


  
const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Present",
    accessor: "present",
    className: "hidden md:table-cell",
  },
 
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role==="admin" || role === "teacher" ? [{
    header: "Actions",
    accessor: "action",
  }]:[]),
];

  const renderRow = (item: AttendanceList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p4">{item.title}</td>
      <td>{item.studentName + " " + item.studentSurname}</td>
      <td >{item.present ? "true" : "false"}</td>
      <td>{item.className}</td> 
      <td className="hidden md:table-cell" > {new Intl.DateTimeFormat("en-US").format(item.date)}</td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="attendance" type="update" data={item} />
              <FormContainer table="attendance" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

const {page, ...queryParams}= searchParams;
const p = page ? parseInt(page):1;
//URL params condition
const query: Prisma.AttendanceWhereInput={};

query.lesson={}

if (queryParams){
  for(const [key, value] of Object.entries(queryParams)){
    if(value !== undefined){
      switch(key){
        case "studentID":
          query.studentId = value;
          break;
        case"search":
        query.OR=[
          {lesson:{name:{contains:value, mode:"insensitive"} }},
          {student:{name:{contains:value, mode:"insensitive"}}}
        ];
        break;
        default:break;
      } 
    }
  }
}

// role conditions 

switch(role){
  case "admin": break;
  case "teacher":
    query.OR=[
      {student:{class:{supervisorId:currentUserId!}}},
      {lesson:{teacherId:currentUserId!}}, 
    ];
    break;
 case "student":
  // query.student ={id:currentUserId!}
  query.studentId=currentUserId!
  break;

  case "parent":
    query.student={parentId:currentUserId!}
    break;
    default:break;
  }


const [dataRes, count] = await prisma.$transaction([
  prisma.attendance.findMany({
    where:query,
    include:{
      student:{select:{name:true, surname:true}},
      lesson:{select:{
        name:true, teacherId:true,
      class:{select:{name:true}}
      }
      },

      },
   take:ITEM_PER_PAGE,
   skip:ITEM_PER_PAGE*(p-1),
  }),
  prisma.attendance.count({where:query})
]);

const data=dataRes.map((item)=>{
  const assessment = item.student || item.lesson;
  if(!assessment) return null;
  
  return{
    id:item.id,
    title:item.lesson.name,
    studentName:item.student.name,
    studentSurname:item.student.surname,
    present:item.present,
    className:item.lesson.class.name,
    date:item.date
  };
}
);




  return (
    <>
    
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hiddenmd:block text-lg font-semibold"> Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
            </>
  )
}
export default AttendancePage