import { currentUser } from "@clerk/nextjs/server";

export async function UserRoleProvider() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  
  return role;
}
