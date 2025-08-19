// export default function Home() {
//   return (
//     <div className=" grid  items-center justify-items-center min-h-screen ">
//       Hey Amshu
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect immediately to login page
  redirect("/login");

  // This return will never actually render
  return null;
}
