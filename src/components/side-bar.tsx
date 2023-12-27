import Link from "next/link"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import SideBarShell from "./shells/side-bar"

export default function SideBar() {
  return (
    <SideBarShell>
      <Command className="h-screen">
        <CommandInput placeholder="Search here." />
        <CommandList className="max-h-[80vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="App Management">
            <Link href={"/app/projects"}>
              <CommandItem>Projects</CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </Command>
    </SideBarShell>
  )
}
