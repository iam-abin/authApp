interface ISuccessResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

const createSuccessResponse = <T>(message: string, data?: T): ISuccessResponse<T> => {
    const response: ISuccessResponse<T> = { success: true, message };
    if (data) response.data = data;
    return response;
};

export default createSuccessResponse;
