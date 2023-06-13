const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const fetchWishlist = createAsyncThunk("fetchWishlist", async () => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.get("/api/wishlist", {
        headers: {
            authorization: token,
        },
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
    }
);

const addToWishlist = createAsyncThunk("addToWishlist", async (product) => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.post("/api/wishlist", product, {
        headers: {
            authorization: token,
        },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
    }
);

const deleteFromWishlist = createAsyncThunk("deleteFromWishlist", async (product) => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.delete(`/api/wishlist/${product.id}`, {
        headers: {
            authorization: token,
        },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWishlist.fulfilled, (state, action) => {
        return action.payload;
        });
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
        return [...state, action.payload];
        });
        builder.addCase(deleteFromWishlist.fulfilled, (state, action) => {
        return state.filter((product) => product.id !== action.payload.id);
        });
    }
});


export default wishlistSlice.reducer;
export { fetchWishlist, addToWishlist, deleteFromWishlist };