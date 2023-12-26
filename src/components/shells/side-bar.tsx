import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type SideBarShellProps = {
  className?: string
  children: React.ReactNode
}

export default function SideBarShell({
  children,
  className,
}: SideBarShellProps) {
  return (
    <aside
      className={cn(className, "fixed z-50 h-full max-w-[15rem] border-r-2")}
    >
      {children}
      {/* <section className="relative bottom-40 flex justify-center">
                <p className="text-muted-foreground">{siteConfig.name}</p>
            </section> */}
    </aside>
  )
}
