// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image"; 
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();

//   console.log(user)
//   const router = useRouter();

//   useEffect(() => {
//     const role = user?.publicMetadata.role;
//     if (role) { router.push(`/${role}`); }
//     router.refresh();
//   }, [user, router]);



//   return (
//     <div className=" flex h-screen max-h-screen">


//       <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
     
//         <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
        

//           <div className="relative flex-1 overflow-y-auto px-[5%]">
//             <section className="mb-12 space-y-4">
//               <h1 className="header" >Hi there 👋</h1>
//               <p className="text-dark-700">
//               Your school, at your fingertips! Our catalogue app is designed to make it easy for you to access the information you need, whenever and wherever you need it.
//               </p>
//             </section>
//             <SignIn.Root>
//               <SignIn.Step
//                 name="start" className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//               >
//                 <h1 className="text-xl font-bold flex items-center gap-2">
//                   <Image src="/logo.png" alt="" width={24} height={24} />
//                   School
//                 </h1>
//                 <h2 className="text-gray-400">Sign in to your account</h2>
//                 <Clerk.GlobalError className="text-sm text-red-400" />
//                 <Clerk.Field name="identifier" className="flex flex-col gap-2">
//                   <Clerk.Label className="text-xs text-gray-500">
//                     Username
//                   </Clerk.Label>
//                   <Clerk.Input type="text" required className="p-2 rounded-md ring-1 ring-gray-300" />
//                   <Clerk.FieldError className="text-xs text-red-400" />
//                 </Clerk.Field>
//                 <Clerk.Field name="password" className="flex flex-col gap-2">
//                   <Clerk.Label className="text-xs text-gray-500">
//                     Password
//                   </Clerk.Label>
//                   <Clerk.Input type="password" required className="p-2 rounded-md ring-1 ring-gray-300" />
//                   <Clerk.FieldError className="text-xs text-red-400" />
//                 </Clerk.Field>
//                 <SignIn.Action submit className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]">
//                   Sign In
//                 </SignIn.Action>
//               </SignIn.Step>
//             </SignIn.Root>
//           </div>

//           <div className="text-14-regular mt-20 flex justify-between">
//             <p className="justify-items-end text-dark-600 xl:text-left">
            
//             Whether you are a student, parent, or teqacher, our app is your go-to resource for all things.
//             Get started with  ...
//               © 2024 Catalog
//             </p>
            
//           </div>
//         </div>
//       </section>

//       <Image
//         src="/mist.png"
//         height={600}
//         width={1000}
//         alt="patient"
//         className="hidden h-full object-cover md:block max-w-[50%] "
//       />
//     </div>
//   );
// };

// export default LoginPage; 

"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Asigură-te că folosești navigation
import Image from "next/image";
// import * as Clerk from "@clerk/clerk-react";
// import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Adaugă verificare pentru isLoaded
    if (!isLoaded) return;

    const role = user?.publicMetadata.role;
    if (isSignedIn && role) {
      router.push(`/${role}`);
      router.refresh();
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Adaugă un loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Dacă utilizatorul este deja autentificat, nu mai afișa pagina de login
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
          <div className="relative flex-1 overflow-y-auto px-[5%]">
            <section className="mb-12 space-y-4">
              <h1 className="header">Hi there 👋</h1>
              <p className="text-dark-700">
                Your school, at your fingertips! Our catalogue app is designed to make it easy for you 
                to access the information you need, whenever and wherever you need it.
              </p>
            </section>
            <SignIn.Root>
              <SignIn.Step
                name="start"
                className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
              >
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Image src="/logo.png" alt="" width={24} height={24} />
                  School
                </h1>
                <h2 className="text-gray-400">Sign in to your account</h2>
                <Clerk.GlobalError className="text-sm text-red-400" />
                <Clerk.Field name="identifier" className="flex flex-col gap-2">
                  <Clerk.Label className="text-xs text-gray-500">
                    Username
                  </Clerk.Label>
                  <Clerk.Input 
                    type="text" 
                    required 
                    className="p-2 rounded-md ring-1 ring-gray-300" 
                  />
                  <Clerk.FieldError className="text-xs text-red-400" />
                </Clerk.Field>
                <Clerk.Field name="password" className="flex flex-col gap-2">
                  <Clerk.Label className="text-xs text-gray-500">
                    Password
                  </Clerk.Label>
                  <Clerk.Input 
                    type="password" 
                    required 
                    className="p-2 rounded-md ring-1 ring-gray-300" 
                  />
                  <Clerk.FieldError className="text-xs text-red-400" />
                </Clerk.Field>
                <SignIn.Action 
                  submit 
                  className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
                >
                  Sign In
                </SignIn.Action>
              </SignIn.Step>
            </SignIn.Root>
          </div>
          <div className="text-14-regular mt-20 flex justify-between">
             <p className="justify-items-end text-dark-600 xl:text-left">
            
             Whether you are a student, parent, or teqacher, our app is your go-to resource for all things.
             Get started with  ...
               © 2024 Catalog
             </p>
            
           </div>
        </div>
      </section>
      <Image
        src="/mist.png"
        height={600}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
};

export default LoginPage;