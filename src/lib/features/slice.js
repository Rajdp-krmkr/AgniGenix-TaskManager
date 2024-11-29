import GetUserData from "@/Firebase Functions/GetuserData";
import { createSlice } from "@reduxjs/toolkit";

let email = "";
let uid = "";

const getUserdata = () => {
  GetUserData({ uid })
    .then((data) => {})
    .catch((error) => {});
};

const initialState = {
  invitedUsers: [],
  email: "",
};

export const invitedUsersSlice = createSlice({
  name: "invitedUsers",
  initialState, // Fixed typo here
  reducers: {
    addInvitedUser: (state, action) => {
      const user = action.payload;
      state.invitedUsers.push(user);
    },
    removeInvitedUser: (state, action) => {
      if (state.invitedUsers.length > 0) {
        state.invitedUsers = state.invitedUsers.filter(
          (user) => user.username !== action.payload.username
        );
      }
    },
    resetInvitedUsersArray: (state) => {
      state.invitedUsers = [];
    },
  },
});

export const { addInvitedUser, removeInvitedUser, resetInvitedUsersArray } =
  invitedUsersSlice.actions;
export default invitedUsersSlice.reducer;