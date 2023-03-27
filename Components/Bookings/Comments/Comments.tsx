import firebase from "firebase/app";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../../Contexts/AuthUserContext";
import { BookingService } from "../../../Services/BookingService";
import { DisplayComments } from "./DisplayComments";
import { Booking, Comment } from "../../../Models/Booking";
import { AddComment } from "./AddComment";
import { LoggerRepo } from "../../../Repositories/LoggerRepo";
import { log } from "../../../consoleHelper";
import { User } from "../../../Models/User";
import { UserRepo } from "../../../Repositories/UserRepo";

export const Comments = ({ booking }: { booking: Booking }) => {
  const { authUser } = useAuthUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();

    if (!authUser) {
      LoggerRepo.error(authUserError);
      return;
    }

    async function getUser(authUser: firebase.User) {
      const user = (await UserRepo.getUser(authUser.uid)) as User;
      setUser(user);
    }

    getUser(authUser);
  }, []);

  const fetchComments = async () => {
    const list = await BookingService.getCommentsFromCollection(booking.code);
    setIsLoading(false);
    if (list) {
      setComments(list);
    }
  };

  const saveComment = (comment: string) => {
    if (!authUser || authUser === undefined) {
      return console.error(authUserNullSaveComment);
    }

    const displayName = authUser.displayName!;
    const email = authUser!.email ?? "";

    const newComment = {
      author: displayName,
      description: comment,
      created: firebase.firestore.Timestamp.now(),
      email: email,
    } as Comment;

    BookingService.saveComment(booking.code, newComment, () => {
      fetchComments();
    });
  };

  return (
    <div className="mb-4">
      <AddComment saveComment={saveComment} />
      {isLoading ? (
        <p>Laster kommentarer... </p>
      ) : (
        <DisplayComments
          authUser={authUser}
          user={user}
          comments={comments}
          handleDeleteComment={(index) => {
            const comment = comments[index];
            if (confirm(`${confirmMessage}'${comment.description}'`)) {
              // Update the database
              BookingService.deleteCommentFromCollection(
                booking.code,
                comment.id,
                () => {
                  fetchComments();
                }
              );
            }
          }}
        />
      )}
    </div>
  );
};

const authUserError = "authUser is null in Comments.tsx";
const authUserNullSaveComment = "Authuser: null in Save comment";
const confirmMessage = "Er du sikker på at du vil slette denne kommentaren? ";
