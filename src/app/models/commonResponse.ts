export class CommonResponse<T> {
    responseCode : number;
    responseMessage: string;
    data: T;
}
