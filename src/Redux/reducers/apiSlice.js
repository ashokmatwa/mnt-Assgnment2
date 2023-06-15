import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//action
export const fetchApi = createAsyncThunk('fetchApi', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}) 

export const updateApi = createAsyncThunk('updateApi', async (data) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json();
  });
  
  export const deleteApi = createAsyncThunk('deleteApi', async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    return id;
  });

const apisSlice = createSlice({
    name:'apis',
    initialState:{
        isLoading: false,
        isError: false,
        apiData: null
    },
    extraReducers: (builder) => {
        //fetch
        builder.addCase(fetchApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apiData = action.payload;
        })
        builder.addCase(fetchApi.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR", action.payload);
        })

        //update
        builder.addCase(updateApi.pending, (state, action) => {
            state.isLoading = true;
          })
        builder.addCase(updateApi.fulfilled, (state, action) => {
            state.isLoading = false;
            // Update the corresponding item in apiData array
            const updatedUser = action.payload;
            const userIndex = state.apiData.findIndex((user) => user.id === updatedUser.id);
            if (userIndex !== -1) {
                state.apiData[userIndex] = updatedUser;
            }
          })
        builder.addCase(updateApi.rejected, (state, action) => {
            state.isError = true;
            console.log('ERROR', action.payload);
          })

        //delete
        builder.addCase(deleteApi.pending, (state, action) => {
            state.isLoading = true;
          })
        builder.addCase(deleteApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apiData = state.apiData.filter((item) => item.id !== action.payload);
          })
        builder.addCase(deleteApi.rejected, (state, action) => {
            state.isError = true;
            console.log('ERROR', action.payload);
          });
    },
    reducers: {
        setApiData: (state, action) => {
          state.apiData = action.payload;
        },
        updateApiData: (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.apiData.findIndex((user) => user.id === updatedUser.id);
        if (userIndex !== -1) {
            state.apiData[userIndex] = updatedUser;
        }
        },
        deleteApiData: (state, action) => {
          state.apiData = state.apiData.filter(item => item.id !== action.payload);
        },
      },
})

export default apisSlice.reducer;
export const { setApiData, updateApiData, deleteApiData } = apisSlice.actions;