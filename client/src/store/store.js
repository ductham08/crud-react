import { configureStore } from '@reduxjs/toolkit';
import { colorsApis } from '../services/colorsApi';

export const store = configureStore({
    reducer: {
        [colorsApis.reducerPath]: colorsApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(colorsApis.middleware),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch; 