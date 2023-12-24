import Link from "next/link"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/next-auth"
// import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { CartSheet } from "@/components/checkout/cart-sheet"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"

import { ModeToggle } from "./mode-toggle"
import OAuthSignInBtn from "./oauth-signin"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

// import { MobileNav } from "@/components/layouts/mobile-nav"
// import { ProductsCommandMenu } from "@/components/products-command-menu"

export async function SiteHeader() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  const initials = `${user?.name?.charAt(0) ?? ""}`

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"ghost"} size={"sm"}>
                    Admin Panel
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Admin priviliage. Go to admin panel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image!}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <DashboardIcon
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/billing">
                        {/* <Icons.dollarSign
                         className="mr-2 h-4 w-4"
                         aria-hidden="true"
                       /> */}
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <OAuthSignInBtn strategy="google" />
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
