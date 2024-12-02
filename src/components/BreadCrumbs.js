"use client";

import { IconButton } from "@mui/material";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import React from "react";

const BreadCrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get the query parameters
  const queryString = searchParams.toString();
  const pathSegments = pathname
    ? pathname
        .split("/") // Split by '/'
        .filter(Boolean) // Remove empty strings
    : [];

  if (pathSegments.length > 2)
    return (
      <div className="flex items-center gap-2">
        <IconButton className="w-fit h-fit !p-0.5">
          <IoArrowBackCircleSharp className="h-7 w-7 text-secondary-400" />
        </IconButton>
        <Breadcrumbs color="secondary">
          {pathSegments.map((item, i) => {
            if (i != 0)
              return (
                <BreadcrumbItem
                  href={
                    "/" +
                    pathSegments.slice(0, i + 1).join("/") +
                    (queryString ? `?${queryString}` : "")
                  }
                  className="capitalize"
                  key={i}
                >
                  {item}
                </BreadcrumbItem>
              );
          })}
        </Breadcrumbs>
      </div>
    );
};

export default BreadCrumb;
