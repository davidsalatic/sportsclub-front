import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileDTO } from '../models/helpers/file-dto';

@Injectable()
export class FileService{

    private readonly FILE_URL='http://localhost:8080/files/';

    constructor(private httpClient: HttpClient){ }

    upload(fileDTO:FileDTO)
    {
        const headers= new HttpHeaders();
        return this.httpClient.post(this.FILE_URL+"upload",fileDTO,{headers,responseType:'text' as 'json'});
    }
}