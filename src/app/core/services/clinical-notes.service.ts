import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateConsultDto } from '../models/clinical-notes/consult.model';
import { CreateOperativeDto } from '../models/clinical-notes/operative-progress.model';
import { CreateRecallDto } from '../models/clinical-notes/recall.model';
import { CreatePerioMaintenanceDto } from '../models/perio-maintenance.model';
import { CreateExtractionDto } from '../models/clinical-notes/extraction.model';
import { BehaviorSubject } from 'rxjs';
import { CreateRootCanalDto } from '../models/clinical-notes/root-canal.model';
import { CreateFillingDto } from '../models/clinical-notes/filling.model';
import { CreateSealantDto } from '../models/clinical-notes/sealant.model';
import { CreateSptHygieneDto } from '../models/clinical-notes/spt-hygiene.model';
import { CreateSrpDto } from '../models/clinical-notes/srp.model';

const baseUrl = '/api/patient-clinical-note/';

@Injectable({
  providedIn: 'root'
})
export class ClinicalNoteService {
  entryDate = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getConsult(patientId: string) {
		return this.http.get(`${baseUrl}consult/patient/${patientId}`);
  }

  createConsult(data: CreateConsultDto, patientId: string) {
		return this.http.post(`${baseUrl}consult/patient/${patientId}`, data);
  }

  updateConsult(data: CreateConsultDto, patientId: string) {
		return this.http.put(`${baseUrl}consult/patient/${patientId}`, data);
  }

  getOperativeProgress(patientId: string) {
		return this.http.get(`${baseUrl}operative/patient/${patientId}`);
  }

  createOperativeProgress(data: CreateOperativeDto, patientId: string) {
		return this.http.post(`${baseUrl}operative/patient/${patientId}`, data);
  }

  updateOperativeProgress(data: CreateOperativeDto, patientId: string) {
		return this.http.put(`${baseUrl}operative/patient/${patientId}`, data);
  }

  getRecall(patientId: string) {
		return this.http.get(`${baseUrl}recall/patient/${patientId}`);
  }

  createRecall(data: CreateRecallDto, patientId: string) {
		return this.http.post(`${baseUrl}recall/patient/${patientId}`, data);
  }

  updateRecall(data: CreateRecallDto, patientId: string) {
		return this.http.put(`${baseUrl}recall/patient/${patientId}`, data);
  }


  getPerioMaintenance(patientId: string) {
		return this.http.get(`${baseUrl}perio-maintenance/patient/${patientId}`);
  }

  createPerioMaintenance(data: CreatePerioMaintenanceDto, patientId: string) {
		return this.http.post(`${baseUrl}perio-maintenance/patient/${patientId}`, data);
  }

  updatePerioMaintenance(data: CreatePerioMaintenanceDto, patientId: string) {
		return this.http.put(`${baseUrl}perio-maintenance/patient/${patientId}`, data);
  }

  getExtraction(patientId: string) {
		return this.http.get(`${baseUrl}extraction/patient/${patientId}`);
  }

  createExtraction(data: CreateExtractionDto, patientId: string) {
		return this.http.post(`${baseUrl}extraction/patient/${patientId}`, data);
  }

  updateExtraction(data: CreateExtractionDto, patientId: string) {
		return this.http.put(`${baseUrl}extraction/patient/${patientId}`, data);
  }

  getFilling(patientId: string) {
		return this.http.get(`${baseUrl}filling/patient/${patientId}`);
  }

  createFilling(data: CreateFillingDto, patientId: string) {
		return this.http.post(`${baseUrl}filling/patient/${patientId}`, data);
  }

  updateFilling(data: CreateFillingDto, patientId: string) {
		return this.http.put(`${baseUrl}filling/patient/${patientId}`, data);
  }

  getRootCanal(patientId: string) {
		return this.http.get(`${baseUrl}root-canal/patient/${patientId}`);
  }

  createRootCanal(data: CreateRootCanalDto, patientId: string) {
		return this.http.post(`${baseUrl}root-canal/patient/${patientId}`, data);
  }

  updateRootCanal(data: CreateRootCanalDto, patientId: string) {
		return this.http.put(`${baseUrl}root-canal/patient/${patientId}`, data);
  }

  getSealant(patientId: string) {
		return this.http.get(`${baseUrl}sealant/patient/${patientId}`);
  }

  createSealant(data: CreateSealantDto, patientId: string) {
		return this.http.post(`${baseUrl}sealant/patient/${patientId}`, data);
  }

  updateSealant(data: CreateSealantDto, patientId: string) {
		return this.http.put(`${baseUrl}sealant/patient/${patientId}`, data);
  }


  getSptHygiene(patientId: string) {
		return this.http.get(`${baseUrl}spt-hygiene/patient/${patientId}`);
  }

  createSptHygiene(data: CreateSptHygieneDto, patientId: string) {
		return this.http.post(`${baseUrl}spt-hygiene/patient/${patientId}`, data);
  }

  updateSptHygiene(data: CreateSptHygieneDto, patientId: string) {
		return this.http.put(`${baseUrl}spt-hygiene/patient/${patientId}`, data);
  }

  getSrp(patientId: string) {
		return this.http.get(`${baseUrl}srp/patient/${patientId}`);
  }

  createSrp(data: CreateSrpDto, patientId: string) {
		return this.http.post(`${baseUrl}srp/patient/${patientId}`, data);
  }

  updateSrp(data: CreateSrpDto, patientId: string) {
		return this.http.put(`${baseUrl}srp/patient/${patientId}`, data);
  }
}
