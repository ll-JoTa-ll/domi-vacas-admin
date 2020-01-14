export class Response<T>{
    data: T;
    exception: string;
    message: string;
    confirmation: boolean;
    notification: boolean;
}