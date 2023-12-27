import { AddProject } from "@/components/projects";

export default function ProjectPage() {
  return (
    <div className="pr-14">
      <div className="flex justify-between">
        <h1 className="text-2xl tracking-wide font-semibold">Projects</h1>
        <AddProject />
      </div>

    </div>
  )
}
