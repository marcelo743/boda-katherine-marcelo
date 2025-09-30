export type Response<T> = {
    error: string | null;
    status: number;
    data: T | null;
};