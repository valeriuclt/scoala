import { z } from "zod";


export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "subject name must be here!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;



export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "numele este obligatoriu" }),
  capacity: z.coerce.number().min(1, { message: "capacitatea este obligatorie" }),
  gradeId: z.coerce.number().min(1, { message: "gradul este obligatoriu!" }),
  supervisorId: z.coerce.string().optional(),
})

export type ClassSchema = z.infer<typeof classSchema>


export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  // password: z.string().min(8, 'Password must be at least 8 characters long').refine((password) => {
  // Ignore the password pwned check
  // return true;
  // }),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;


export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;


export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event name must be here!" }),
  description: z.string().min(1, { message: "Description is required" }),

  startTime: z.coerce.date({ message: "time data is required" }),
  endTime: z.coerce.date({ message: "time data is required" }),

  classId: z.coerce.number({ message: "class is required" }), //teacher ids
});

export type EventSchema = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event name must be here!" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.coerce.date({ message: "data is required" }),

  classId: z.coerce.number({ message: "class is required" }), //teacher ids
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event name must be here!" }),
  startDate: z.coerce.date({ message: "time data is required" }),
  dueDate: z.coerce.date({ message: "data is required" }),

  lessonId: z.coerce.number({ message: "class is required" }), //teacher ids
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const parentSchema = z.object({
  id: z.coerce.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string(),
  address: z.string(),
  // students:z.array(z.string().optional().or(z.literal(""))), //students ids
});

export type ParentSchema = z.infer<typeof parentSchema>;


export const resultSchema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce.number().min(1, { message: "score must be here!" }),
  

  examId: z.coerce.number().optional(), //exam ids
  assignmentId: z.coerce.number().optional(), //assignment ids
  studentId:z.string().min(1, { message: "student Id is required!" }),
});

export type ResultSchema = z.infer<typeof resultSchema>;

export const attendanceSchema = z.object({
  id: z.coerce.number().optional(),
  date: z.coerce.date( { message: "date must be here!" }),

  present: z.coerce.boolean(), //exam ids
  studentId:z.string().min(1, { message: "student Id is required!" }),
  lessonId: z.number().min(1, { message: "lesson Id is required!" }), //lesson ids
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;
