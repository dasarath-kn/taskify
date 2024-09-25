import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
    userId: string;
}

const initialState: UserState = {
    userId: "",
};

const userSlice = createSlice({
    name: "userslice",
    initialState,
    reducers: {
        addDetails: (state, action: PayloadAction<{ userId: string }>) => {
            state.userId = action.payload.userId;
        },
        removeDetails: (state) => {
            state.userId = "";
        },
    },
});

export const { addDetails, removeDetails } = userSlice.actions;
export default userSlice.reducer;
