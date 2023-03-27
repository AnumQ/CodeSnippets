import React from "react";
import { Project } from "../../../Models/Project";

export const ListView = ({ projects }: { projects: Project[] }) => {
  return (
    <table className="table">
      <thead>
        <TableHeaders />
      </thead>
      <tbody>
        <TableData projects={projects} />
      </tbody>
    </table>
  );
};

const TableData = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      {projects.map((project, index) => {
        return (
          <TableRow
            key={index + project.projectId}
            index={index}
            project={project}
          />
        );
      })}
    </>
  );
};

const TableHeaders = () => {
  return (
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Id</th>
      {/* <th scope="col">Description</th> */}
    </tr>
  );
};

const TableRow = ({ project, index }: { project: Project; index: number }) => {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{project.name}</td>
      <td>{project.projectId}</td>
    </tr>
  );
};
