type SideBarOptions = {
  title: string
  items: {
    title: string
    href: string
  }[]
  isAdminOnly?: boolean
}

export const sideBarOptions: SideBarOptions[] = [
  {
    title: "App Management",
    isAdminOnly: true,
    items: [
      {
        title: "Projects",
        href: "app/projects",
      },
    ],
  },
]
