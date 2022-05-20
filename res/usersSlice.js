import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "counter",
  initialState: {
    users: [
      {
        destination: "Pariz",
        leaveFlightClass: "prvi",
        returnFlightClass: null,
        leaveDate: "22.6.2022",
        returnDate: null,
        name: "Jaka",
        surname: "Mraz",
        price: 120,
        key: 1,
      },
      {
        destination: "Seattle",
        leaveFlightClass: "prvi",
        returnFlightClass: "ekonomski",
        leaveDate: "22.6.2022",
        returnDate: "24.6.2022",
        name: "Gregor",
        surname: "Kos",
        price: 1040,
        key: 2,
      },
    ],
  },
  reducers: {
    addUser: (state, user) => {
      state.users = [...state.users, user.payload];
    },
    deleteUser: (state, key) => {
      state.users = state.users.filter((user) => user.key !== key.payload);
    },
    emptyUsers: (state) => {
      state.users = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, emptyUsers } = usersSlice.actions;

export default usersSlice.reducer;
