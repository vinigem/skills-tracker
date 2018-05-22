import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const ADD_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/add-skill';
const UPDATE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/update-skill';
const DELETE_SKILL_URL = 'https://skills-tracker-server.herokuapp.com/skill/delete-skill';
const FIND_ALL_SKILLS_URL = 'https://skills-tracker-server.herokuapp.com/skill/find-all-skills';

const ADD_ASSOCIATE_URL = 'https://skills-tracker-server.herokuapp.com/associate/add-associate';
const UPDATE_ASSOCIATE_URL = 'https://skills-tracker-server.herokuapp.com/associate/update-associate';
const DELETE_ASSOCIATE_URL = 'https://skills-tracker-server.herokuapp.com/associate/delete-associate';
const FIND_ASSOCIATE_URL = 'https://skills-tracker-server.herokuapp.com/associate/find-associate';
const FIND_ALL_ASSOCIATES_URL = 'https://skills-tracker-server.herokuapp.com/associate/find-all-associates';

const FIND_ASSOCIATE_SKILLS_URL = 'https://skills-tracker-server.herokuapp.com/associate/find-associate-skills';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {}

    getAllSkills(): Observable<any> {
        return this.httpClient.get(FIND_ALL_SKILLS_URL);
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

    updateAssociate(associate: any): Observable<any> {
        return this.httpClient.post(UPDATE_ASSOCIATE_URL, associate, {responseType: 'text'});
    }

    deleteAssociate(associateId: any): Observable<any> {
        return this.httpClient.post(DELETE_ASSOCIATE_URL, associateId, {responseType: 'text'});
    }

    getAssociate(associateId: any): Observable<any> {
        return this.httpClient.post(FIND_ASSOCIATE_URL, associateId);
    }

    getAllAssociates(): Observable<any> {
        return this.httpClient.get(FIND_ALL_ASSOCIATES_URL);
    }


    getAssociateSkills(associateId: any): Observable<any> {
        return this.httpClient.post(FIND_ASSOCIATE_SKILLS_URL, associateId);
    }
   

}