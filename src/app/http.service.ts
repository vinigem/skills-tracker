import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const ADD_SKIL_URL = 'https://skills-tracker-server.herokuapp.com/skill/add-skill';
const UPDATE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/update-skill';
const DELETE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/delete-skill';
const VIEW_ALL_SKILLS_URL = 'https://skills-tracker-server.herokuapp.com/skill/view-all-skills';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {}

    getAllSkills(): Observable<any> {
        return this.httpClient.get(VIEW_ALL_SKILLS_URL);
    }

    addSkill(skill: any): Observable<any> {
        return this.httpClient.post(ADD_SKIL_URL, skill, {responseType: 'text'});
    }

    updateSkill(skill: any): Observable<any> {
        return this.httpClient.post(UPDATE_SKILL_URL, skill, {responseType: 'text'});
    }

    deleteSkill(skillId: number): Observable<any> {
        return this.httpClient.post(DELETE_SKILL_URL, skillId, {responseType: 'text'});
    }
   

}