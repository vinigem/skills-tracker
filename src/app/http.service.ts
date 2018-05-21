import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const ADD_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/add-skill';
const UPDATE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/update-skill';
const DELETE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/delete-skill';
const VIEW_ALL_SKILLS_URL = 'https://skills-tracker-server.herokuapp.com/skill/view-all-skills';

const ADD_ASSOCIATE_URL = 'https://skills-tracker-server.herokuapp.com/associate/add-associate';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {}

    getAllSkills(): Observable<any> {
        return this.httpClient.get(VIEW_ALL_SKILLS_URL);
    }

    addSkill(skill: any): Observable<any> {
        return this.httpClient.post(ADD_SKILL_URL, skill, {responseType: 'text'});
    }

    updateSkill(skill: any): Observable<any> {
        return this.httpClient.post(UPDATE_SKILL_URL, skill, {responseType: 'text'});
    }

    deleteSkill(skillId: number): Observable<any> {
        return this.httpClient.post(DELETE_SKILL_URL, skillId, {responseType: 'text'});
    }

    addAssociate(associate: any): Observable<any> {
        return this.httpClient.post(ADD_ASSOCIATE_URL, associate, {responseType: 'text'});
    }
   

}