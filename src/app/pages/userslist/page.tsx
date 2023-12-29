'use strict';
import React from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/data-table';

function ProjectList() {
    interface Projects {
        projects_name: string;
        projects_description: string;
        mentor_name: string;
    }

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
    ];

    return (
        <div>
            <div className="w-full p-5 mt-2 mb-5">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default ProjectList;
