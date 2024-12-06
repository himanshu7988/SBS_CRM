import { Button } from "@nextui-org/react";
import React from "react";

export const GetActiveLabel = ({ status, ...props }) => {
  if (status) {
    return (
      <Button
        radius="full"
        size="sm"
        className="bg-green-500 text-white font-semibold px-3 text-xs py-0"
        {...props}
      >
        Active
      </Button>
    );
  } else {
    return (
      <Button
        radius="full"
        size="sm"
        className="bg-red-500 text-white font-semibold px-3 text-xs py-0"
        {...props}
      >
        Inactive
      </Button>
    );
  }
};
