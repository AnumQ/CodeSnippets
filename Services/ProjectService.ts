import React from "react";
import { sortProductByName } from "../Components/Products/utils";
import { sortProjectByName } from "../Components/Projects/utils";
import { log } from "../consoleHelper";
import { COLLECTION } from "../Constants";
import { db } from "../iSnittFirebase";
import { Project } from "../Models/Project";
import { LoggerRepo } from "../Repositories/LoggerRepo";

export class ProjectService {
  /**
   * @param projectId doc id of the project
   * @returns Project Document from Firebase
   */
  static getProject = async (
    projectId: string
  ): Promise<Project | undefined> => {
    try {
      const doc = await db.collection(COLLECTION.PROJECTS).doc(projectId).get();

      const project = doc.data() as Project;
      project.projectId = parseInt(doc.id);

      return project;
    } catch (error) {
      log(error);
      LoggerRepo.error(error);
    }
  };

  static getCompletedProjects = async () => {
    try {
      const ref = db.collection(COLLECTION.PROJECTS);
      const query = ref.where("completed", "!=", false);
      const docs = await query.get();

      const projects: Project[] = [];
      docs.forEach((doc: firebase.firestore.DocumentData) => {
        const project = doc.data() as Project;
        project.projectId = parseInt(doc.id);
        projects.push(project);
      });

      console.log(projects);
    } catch (error) {
      log(error);
    }
  };

  static deleteCompletedProjects = async () => {
    try {
      const ref = db.collection(COLLECTION.PROJECTS);
      const query = ref.where("completed", "!=", false);
      const docs = await query.get();

      const batch = db.batch();

      docs.forEach((doc: firebase.firestore.DocumentData) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      log(error);
    }
  };

  /**
   * @returns a list of projects from Firebase
   */
  static getProjects = async (): Promise<Project[] | undefined> => {
    try {
      const docs = await db.collection(COLLECTION.PROJECTS).get();

      const projects: Project[] = [];
      docs.forEach((doc: firebase.firestore.DocumentData) => {
        const project = doc.data() as Project;
        project.projectId = parseInt(doc.id);
        projects.push(project);
      });

      const sorted = sortProjectByName(projects);
      return sorted;
    } catch (error) {
      log(error);
    }
  };

  /**
   *
   * @param projectId id of the project to be updated
   * @param data fields to update
   * @param onCompletion code to execute after the project is updated
   */
  static updateProject = (
    projectId: string,
    data: { products: Product[] },
    onCompletion: () => void
  ) => {
    db.collection(COLLECTION.PROJECTS)
      .doc(projectId)
      .set(data, { merge: true })
      .then(() => {
        onCompletion();
      })
      .catch((error) => {
        log(error);
      });
  };

  /**
   * Adds projects to Firebase
   * @param projects projects from Accounting
   */
  static addProjects = (projects: Project[], onCompletion?: () => void) => {
    const batch = db.batch();

    projects.forEach((project) => {
      const docRef = db
        .collection(COLLECTION.PROJECTS)
        .doc(project.projectId.toString());

      batch.set(
        docRef,
        {
          name: project.name,
          completed: project.completed,
        },
        { merge: true }
      );
    });

    batch
      .commit()
      .then(() => {
        // fetch projects again
        if (onCompletion) {
          onCompletion();
        }
      })
      .catch((error) => {
        LoggerRepo.error(error);
      });
  };

  /**
   * Update projects in Firebase
   * @param projects projects from Accounting
   */
  static updateProjects = (projects: Project[], onCompletion?: () => void) => {
    const batch = db.batch();

    // set data to batch
    projects.forEach((project) => {
      const docRef = db
        .collection(COLLECTION.PROJECTS)
        .doc(project.projectId.toString());

      batch.update(docRef, {
        name: project.name,
        completed: project.completed,
      });
    });

    // update batch in database
    batch
      .commit()
      .then(() => {
        // fetch projects again
        if (onCompletion) {
          onCompletion();
        }
      })
      .catch((error) => {
        LoggerRepo.error(error);
      });
  };
}
