export interface ApiResponse<T>{
    isSuccess: boolean;
    msg: string;
    errors: string[];
    data: T | null;
}