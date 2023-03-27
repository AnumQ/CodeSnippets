import React, { useEffect, useState } from "react";
import { Container, Menu } from "../UI/shared";
import { ImportProjects } from "./ImportProjects";
import { log } from "../../consoleHelper";
import { useProjects } from "../../Hooks/useProjects";
import { ListView as ListView } from "./UI/ListView";

/**
 * Display Projects from iSNITT DATBASE
 */
export const Projects = () => {
  const { projects } = useProjects();

  const PageMenu = () => {
    return (
      <Menu>
        <ImportProjects />
      </Menu>
    );
  };

  return (
    <Container>
      <PageMenu />
      <ListView projects={projects} />
    </Container>
  );
};
