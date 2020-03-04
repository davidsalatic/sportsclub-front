import { Injectable } from '@angular/core';

@Injectable()
export class TrainingSessionService{

    private readonly SESSIONS_URL = 'http://localhost:8080/sessions/';
}