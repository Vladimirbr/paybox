import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MissionData } from '../interfaces/MissionData';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  fetchAllMissions() {
    const url = `${this.baseUrl}mission`;
    return this.http.get<{ data: MissionData[]; message: string }>(url);
  }

  deleteMissionByKey(params: { key: string }) {
    const url = `${this.baseUrl}mission/${params.key}`;
    return this.http.delete(url);
  }

  createUpdateMission(params: { key: string; value: string | object }) {
    const url = `${this.baseUrl}mission`;
    return this.http.post(url, params);
  }
}
