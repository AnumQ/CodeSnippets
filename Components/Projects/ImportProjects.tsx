import React from "react";
import { Button } from "react-bootstrap";
import { useProjects } from "../../Hooks/useProjects";
import { Spinner } from "../UI/Spinner";

export const ImportProjects = () => {
  const { importProjects, isLoading } = useProjects();

  return (
    <div>
      {isLoading ? (
        <Spinner fullHeight={false} />
      ) : (
        <Button onClick={importProjects}>Import Projects</Button>
      )}
    </div>
  );
};
