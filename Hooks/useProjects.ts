import _ from "lodash";
import React, { useEffect } from "react";
import { useProjectsContext } from "../Contexts/ProjectsContext";
import { Project } from "../Models/Project";
import { LoggerRepo } from "../Repositories/LoggerRepo";
import { ProjectService } from "../Services/ProjectService";
import { useLoading } from "./useLoading";

export const useProjects = () => {
  const { projects, setProjects } = useProjectsContext();
  const { isLoading, setIsLoading } = useLoading(false);

  const PROJECT_ID = "projectId";

  useEffect(() => {
    return () => {
      //clean up function
    };
  }, []);

  const importProjects = () => {
    setIsLoading(true);
    AccountantService.getProjects((data: Project[]) => {
      const existingProjects = _.cloneDeep(projects);
      let projectsFromAccounting = _.cloneDeep(data as Project[]);

      const projectsToAdd = _.pullAllBy(
        projectsFromAccounting,
        existingProjects,
        PROJECT_ID
      );
      ProjectService.addProjects(projectsToAdd, () => {
        fetchProjects();
      });

      projectsFromAccounting = _.cloneDeep(data as Project[]);
      const projectsToUpdate = _.pullAllBy(
        projectsFromAccounting,
        projectsToAdd,
        PROJECT_ID
      );
      ProjectService.updateProjects(projectsToUpdate, () => {
        fetchProjects();
      });
      setProjects(data);
      setIsLoading(false);
    });
  };

  const fetchProjects = async () => {
    const data = await ProjectService.getProjects();
    if (!data) {
      return LoggerRepo.error(`fetchProjects: Projects are ${data}`);
    }
    setProjects(data);
  };

  return { projects, importProjects, isLoading, fetchProjects };
};
