import { AddProject } from "@/components/projects"

export default function ProjectPage() {
  return (
    <div className="pr-14">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">Projects</h1>
        <AddProject />
      </div>
    </div>
  )
}
