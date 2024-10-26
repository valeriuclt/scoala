"use server";
import { AnnouncementSchema, AssignmentSchema, AttendanceSchema, ClassSchema, EventSchema, ExamSchema, ParentSchema, ResultSchema, StudentSchema, SubjectSchema, TeacherSchema, } from "./formValidationSchema";
import prisma from "./prisma"; 
import { auth } from "@clerk/nextjs/server";
 

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
  // ):Promise<CurrentState> =>{
) => {
  console.log(data.name + " in the server")
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects")

    return { success: true, error: false }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}


export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



export const createClass = async (
  currentState: CurrentState, data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    })

    return { success: true, error: false };

  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}


export const updateClass = async (
  currentState: CurrentState, data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data
    });
    return { success: true, error: false }
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState, data: FormData
) => {
  const id = data.get("id") as string;

  try {
    await prisma.class.delete({
      where: { id: parseInt(id), },
    });
    return { success: true, error: false }
  } catch (error) {
    console.log(error);
    return { success: false, error: true }
  }
}

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {

    await prisma.teacher.create({
      data: {
        id: data.username,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    // const user = await clerkClient.users.updateUser(data.id, {
    //   username: data.username,
    //   ...(data.password !== "" && { password: data.password }),
    //   firstName: data.name,
    //   lastName: data.surname,
    // });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        // ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // await clerkClient.users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id: id,
        // id: parseInt(id),
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};




export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  console.log(data);

  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    await prisma.student.create({
      data: {
        id: data.username,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    // const user = await clerkClient.users.updateUser(data.id, {
    //   username: data.username,
    //   ...(data.password !== "" && { password: data.password }),
    //   firstName: data.name,
    //   lastName: data.surname,
    // });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        // ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // await clerkClient.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


// export const createExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
//   // ):Promise<CurrentState> =>{
// ) => {
//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//   if (role === "teacher") { 
//       const teacherLesson = await prisma.lesson.findFirst({
//         where: {
//           teacherId: userId!,  id: data.lessonId,
//         },
//       });
//       if (!teacherLesson) return { success: false, error: true };
//     }    
//     await prisma.exam.create({
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         lessonId: data.lessonId,
//       },
//     });
//     // revalidatePath("/list/subjects")
//     return { success: true, error: false }
//   } catch (error) {
//     console.log(error)
//     return { success: false, error: true }
//   }
// }


// export const updateExam = async (
//   currentState: CurrentState,  data: ExamSchema
// ) => {
//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     if (role === "teacher"){
//       const teacherLesson = await prisma.lesson.findFirst({
//         where:{teacherId:userId!, id:data.lessonId}
//       });
//       if (!teacherLesson) return{success:false, error:true}
//       await prisma.exam.update({
//               where: {
//                 id: data.id,
//               },
//               data: {
//                 title: data.title,
//                 startTime: data.startTime,
//                 endTime: data.endTime,
//                 lessonId: data.lessonId,
//               },
//             })
//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteExam = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;

//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     await prisma.exam.delete({
//       where: {
//         id: parseInt(id),
//         ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
//       },
//     });
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };




// export const createExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
// ) => {
//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     if (role === "teacher") {
//       const teacherLesson = await prisma.lesson.findFirst({
//         where: {
//           teacherId: userId!,
//           id: data.lessonId,
//         },
//       });

//       if (!teacherLesson) {
//         return { success: false, error: true };
//       }
//     }

//     await prisma.exam.create({
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         lessonId: data.lessonId,
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
// ) => {
//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     if (role === "teacher") {
//       const teacherLesson = await prisma.lesson.findFirst({
//         where: {
//           teacherId: userId!,
//           id: data.lessonId,
//         },
//       });

//       if (!teacherLesson) {
//         return { success: false, error: true };
//       }
//     }

//     await prisma.exam.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         lessonId: data.lessonId,
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteExam = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;

//   const { userId, sessionClaims } = auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     await prisma.exam.delete({
//       where: {
//         id: parseInt(id),
//         ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher" ) {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    //   console.log('lectia',teacherLesson)
    // }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher" ) {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    //   console.log('lectia',teacherLesson)
    // }

    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { class: { supervisorId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {

  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {

    await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.announcement.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { class: { supervisorId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {

  try {
    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {

    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema,
) => {
  console.log(data);

  try {

    await prisma.parent.create({
      data: {
        id: data.username,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data?.email,
        phone: data.phone,
        address: data.address,
        students: {
          // connect:data.students.map((studentId)=>({id:studentId})),
        },
      }
    })

    // revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema
) => {
  try {
    await prisma.parent.update({
      where: {
        id: data.id,
      },
      data: {
        id: data.username,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data?.email,
        phone: data.phone,
        address: data.address,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // await clerkClient.users.deleteUser(id);

    await prisma.parent.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {

  try {
    await prisma.result.create({
      data: {
        score: data.score,
        examId: data.examId,
        assignmentId: data.assignmentId,
        studentId: data.studentId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {

    await prisma.result.update({
      where: {
        id: data.id,
      },
      data: {
        score: data.score,
        examId: data.examId,
        assignmentId: data.assignmentId,
        studentId: data.studentId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.result.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { student: { class: { supervisor: { id: userId! } } } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAttendance = async (
  currentState: CurrentState,
  data: AttendanceSchema
) => {

  try {
    await prisma.attendance.create({
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAttendance = async (
  currentState: CurrentState,
  data: AttendanceSchema
) => {
  try {

    await prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAttendance = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  // console.log('deleteA',id)

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.attendance.delete({
      where: {

        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


// export const createTeacher = async (
//   currentState:CurrentState, data:TeacherSchema
// ) =>{
//   try {
//         const user = await clerkClient.users.createUser({
//           username: data.username,
//           password: data.password,
//           firstName: data.name,
//           lastName: data.surname,
//           publicMetadata:{role:"teacher"}
//         });

//         await prisma.teacher.create({
//           data: {
//             id: user.id,
//             username: data.username,
//             name: data.name,
//             surname: data.surname,
//             email: data.email || null,
//             phone: data.phone || null,
//             address: data.address,
//             img: data.img || null,
//             bloodType: data.bloodType,
//             sex: data.sex,
//             birthday: data.birthday,
//             subjects: {
//               connect: data.subjects?.map((subjectId: string) => ({
//                 id: parseInt(subjectId),
//               })),
//             },
//           },
//         });
//     return {success:true,error:false}

//   } catch (error) {
//     console.log(error);
//     return {success:false,error:true};
//   }
// }

// export const updateTeacher = async (
//   currentState:CurrentState, data:TeacherSchema
// ) =>{
//   try {
//     await prisma.teacher.update({
//       where: {id:data.id},
//       data,
//     })
//     return {success:true,error:false}

//   } catch (error) {
//     console.log(error);
//     return {success:false,error:true};
//   }
// }

// export const deleteTeacher = async (
//   currentState:CurrentState, data:FormData
// ) =>{
//   const id= data.get("id") as string;
//   try {
//     // await clerkClient.users.deleteUser(id);
//     await prisma.teacher.delete({where:{id:id,},});
//     return {success:true,error:false}
//   } catch (error) {  console.log(error);
//     return {success:false,error:true};
//   }};