export type FileInfo = {
    Type: string,
    Name: string,
    Size: number   
}

export type ListResponse = {
    ErrorCode: number,
    ErrorMessage: string,
    FileList: FileInfo[],
    Result: boolean,
}

