import React from "react";
import { Project } from "../../Models/Project";

export const sortProjectByName = (list: Project[]) => {
  return list.sort((a, b) => a.name.localeCompare(b.name));
};
