import React, { createContext, useContext, useEffect, useState } from "react";

import LogRocket from "logrocket";
import { Project } from "../Models/Project";
import { LoggerRepo } from "../Repositories/LoggerRepo";
import { ProjectService } from "../Services/ProjectService";
import { log } from "../consoleHelper";
import { useAuthUserContext } from "./AuthUserContext";
LogRocket.init("xj5k9b/isnitt-portal");

// use from provider
export const useProjectsContext = () => {
  return { ...useContext(ProjectsContext) };
};

const ProjectsContext = createContext<{
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}>(null!);

type Props = {
  children: JSX.Element;
};

export const ProjectsContextProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { authUser } = useAuthUserContext();
  useEffect(() => {
    // log("IN ProjectContextProvider");

    async function fetchProjects(setProjects: any) {
      const projects = await ProjectService.getProjects();
      if (!projects) {
        return LoggerRepo.error(`Projects: Projects are ${projects}`);
      }
      setProjects(projects);
    }

    if (authUser) {
      // log("Fetch projects HEREEEE");
      fetchProjects(setProjects);
    }
  }, [authUser]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
