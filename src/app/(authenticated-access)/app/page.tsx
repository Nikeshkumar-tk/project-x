'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from 'react-query';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
 
export default function AuthenticatedDashBoard() {
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    return data;
  };
const { data, isLoading, error } = useQuery('apiData', fetchData);

if (isLoading) {
return <div>Loading...</div>;
}

  
  return (
    <div>
      <h1>Users Management</h1>
      {
        data?.map((value:any,index:any)=>{
          return(
            <div key={index}>
            <Card className="w-[350px] flex mt-5">
            <div  className="p-4">
            <Avatar>
            <AvatarImage src={value.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </div>
          <div className="p-5 flex font-medium text-xl gap-10">
          <h1>{value.name}</h1>
          <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          
          </div>
          </Card>
          </div>
          )
        })
      }
     
    </div>
  )
}
