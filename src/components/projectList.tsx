'use client'
import React,{useState} from 'react'
import { useQuery } from 'react-query';
import Image from "next/image"
import { DataTable } from './data-table';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ColumnDef } from "@tanstack/react-table"
import { Minus, Plus } from "lucide-react"
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import BubbleChart from './bubble-chart';
function ProjectList() {
    interface Projects {
        projects_name: string
        projects_description: string
        mentor_name:string
      }
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const [curruntRow, setCurruntRow] = useState([{}]);
      const [goal, setGoal] = React.useState(350)

      const handleViewTimeLines = () => {
        // Open the drawer
        setIsDrawerOpen(true);
      };
    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/project');
        const data = await response.json();
        return data;
      };
    const { data, isLoading, error } = useQuery('apiData', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
 

  const columns: ColumnDef<Projects>[] = [
    {
      accessorKey: "projects_name",
      header: "Project Name",
    },
    {
      accessorKey: "projects_description",
      header: "Project Descriptions",
    },
    {
        accessorKey: "mentor_name",
        header: "Mentor Name",
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
           
    const handleViewTimeLines = () => {
      console.log("View TimeLines for row:", row.original);
      setIsDrawerOpen(true)
      setCurruntRow(row.original.timelines)
      // Perform your desired action with the selected row data
    };

        
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem> */}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleViewTimeLines}>View TimeLines</DropdownMenuItem>
                <DropdownMenuItem>View Student details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  ]

 
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

 
  return (
    <div >
    <div className="w-full p-5 mt-2 mb-5">
      <DataTable columns={columns} data={data} />
    
 <Drawer  open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>

 <DrawerContent>
   <div className="mx-auto w-full max-w-sm flex justify-center">
     <DrawerHeader>
       <DrawerTitle>TimeLine</DrawerTitle>
       {/* <DrawerDescription>.</DrawerDescription> */}
     </DrawerHeader>
   </div>
   <ResponsiveContainer width="100%" height="60%">
         <BubbleChart data={curruntRow}/>
        </ResponsiveContainer>
 </DrawerContent>
</Drawer>

    </div>
  </div>
  )
}

export default ProjectList