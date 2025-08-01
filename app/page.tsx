import { redirect } from "next/navigation"

export default function IndexPage() {
  // Redirect to landing page as the first thing clients see
  redirect("/landing")
}
