import React from "react";
import { User } from "../Models/User";
import { UserRepo } from "../Repositories/UserRepo";
import firebase from "firebase/app";
import { log } from "../consoleHelper";

export class UserService {
  /**
   * Create user in users collection in Firestore based on user from google login
   * Create only when it doesn't exist
   * @param user create user in users in Firestore based on Firebase.User
   */
  static createUser = async (user: firebase.User) => {
    try {
      const res = await UserRepo.getUser(user.uid);
      const firebaseUser = res as User;
      if (!firebaseUser) {
        UserRepo.createUser(user.uid, user.email ?? "");
      }
    } catch (error) {
      console.error(createUserError);
    }
  };

  static getUsers = async () => {
    const res = await UserRepo.getUsers();
    return res;
  };
}

const createUserError = "Error occured when creating user";
