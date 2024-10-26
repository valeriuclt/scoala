import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;


  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        console.log('relatedData', relatedData)
        break;

      case "class":
        const classGrades = await prisma.grade.findMany({ select: { id: true, level: true }, });
        const classTeachers = await prisma.teacher.findMany({ select: { id: true, name: true, surname: true }, });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;

      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;

      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;

      case "exam":
        // const {userId, sessionClaims} = auth();
        // const role = ( sessionClaims?.metadata as {role ? :"admin"|"teacher"|"student"|"parent"})?.role;

        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? { teacherId: userId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;

      case "event":
        const eventClass = await prisma.class.findMany({
          where: {
            ...(role === 'teacher' ? { supervisorId: userId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { classess: eventClass };
        break;
      case "announcement":
        const announcementClass = await prisma.class.findMany({
          where: {
            ...(role === 'teacher' ? { supervisorId: userId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { classess: announcementClass };
        break;

      case "assignment":
        const assignmentClass = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? { teacherId: userId! } : {}),
          },
          select: { id: true, name: true },
        });

        relatedData = { lessons: assignmentClass };
        break;

      case "parent":
        const studentParent = await prisma.student.findMany({
          select: { name: true, surname: true }
        });
        relatedData = { students: studentParent };
        break;

      case "result":
        const resultExam = await prisma.exam.findMany({
          where: {
            ...(role === 'teacher' ? { lesson: { teacher: { id: userId! } } } : {}),
          },
          select: { id: true, title: true, startTime: true },
        });

        const resultAssignment = await prisma.assignment.findMany({
          where: {
            ...(role === 'teacher' ? { lesson: { teacher: { id: userId! } } } : {}),
          },
          select: { id: true, title: true, startDate: true },
        });
        const resultStudent = await prisma.student.findMany({
          where: {
            ...(role === 'teacher' ? { class: { supervisor: { id: userId! } } } : {}),
          },
          select: { id: true, name: true, surname: true },
        });

        relatedData = { resultsE: resultExam, resultsA: resultAssignment, resultsS: resultStudent };
        break;

      case "attendance":
        const resultS = await prisma.student.findMany({
          where: {
            ...(role === 'teacher' ? { class: { supervisor: { id: userId! } } } : {}),
          },
          select: { id: true, name: true, surname: true },
        });

        const resultL = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? { teacherId: userId! } : {}),
          },
          select: { id: true, name: true },
        });

        relatedData = { resultS: resultS, resultL: resultL };
        break;

      default:
        break;
    }
  }

  return (

    <div className="">

      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;