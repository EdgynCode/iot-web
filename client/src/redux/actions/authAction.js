import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice.js";
import authService from "../services/authService.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ body }, thunkAPI) => {
    try {
      const data = await authService.login(body);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
