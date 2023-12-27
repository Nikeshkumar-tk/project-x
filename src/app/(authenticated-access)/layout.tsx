import SideBar from "@/components/side-bar"

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-[80vh]">
      <SideBar />
      <div className="ml-64 p-4">{children}</div>
    </div>
  )
}
