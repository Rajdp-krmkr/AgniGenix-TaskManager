import { db } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";

const isUserAuthenticated = ({ username, uid }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if username is valid
      if (!username) {
        console.error("Invalid username: Username is required.");
        return reject(false);
      }
      
      // console.log("Checking username:", username);

      // Create a document reference in the "users" collection with the given username
      const docRef = doc(db, "users", username);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        // Compare the uid from the document with the provided uid
        docSnap.data()?.uid === uid ? resolve(true) : reject(false);
        // console.log("User authenticated successfully.");
      } else {
        // Document doesn't exist
        // console.log("No such document!");
        reject(false);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      reject(false);
    }
  });
};

export default isUserAuthenticated;

export const CheckIfUserAssignedToWorkspace = (
  workspaceTitle,
  workspaceID,
  username
) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "workspaces", workspaceID);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const membersArray = data.members;
        const title = data.workspaceTitle;
        // const projects = data.projects;

        

        let isAssigned = false;

        if (title === workspaceTitle) {
          for (let i = 0; i < membersArray.length; i++) {
            if (
              membersArray[i].username === username &&
              membersArray[i].isPendingInvitation === false &&
              (membersArray[i].isInvitationAccepted === true ||
                membersArray[i].isAdmin == true)
            ) {
              // Check if the user is assigned to the workspace
              isAssigned = true;
              resolve({
                isWorkspaceFound: true,
                isAssigned: true,
                message: "User is assigned to workspace",
                membersData: membersArray,
                // projects: projects,
              });
              break;
            }
          }
          if (isAssigned === false) {
            resolve({
              isWorkspaceFound: true,
              isAssigned: false,
              message: "User is not assigned to workspace",
              membersData: null,
              // projects: [],
            });
          }
        } else {
          resolve({
            isWorkspaceFound: false,
            isAssigned: null, //if workspace is not found, then user may or may not be assigned. so this value is null
            message: "No workspace found with the given workspaceTitle",
            membersData: null,
            // projects: [],
          });
        }
      } else {
        resolve({
          isWorkspaceFound: null,
          isAssigned: null,
          message: "No workspace found with the given ID",
          membersData: null,
          // projects: [],
        });
      }
    } catch (error) {
      console.error("Error during workspace check:", error);
      reject({
        isWorkspaceFound: null,
        isAssigned: null,
        message: "Error during workspace check",
        membersData: null,
        // projects: [],
      });
    }
  });
};
