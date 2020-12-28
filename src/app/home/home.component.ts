import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
@Injectable()
export class HomeComponent implements OnInit {
	bodyText: string;
	titleDelete: string;
	readonly apiURL: string;
	public dateToday: string;
	resultListTasks: {};
	public getRowEdit: { id: any; titulo: any; desc: any; criacao: any; edicao: any; status: any; };
	newTask: {};
	modelDelete: any;

	constructor(private http: HttpClient) {
		this.apiURL = 'https://5fe1ea217a94870017681bf6.mockapi.io/Tasks';
		this.newTask = {
			titulo: '',
			desc: '',
			criacao: new Date().toLocaleDateString(),
			edicao: new Date().toLocaleDateString(),
			status: 'New'
		};
		this.modelDelete;
	}

	// Listar Tasks - GET
	listarTasks() {
		this.http.get(`${this.apiURL}`)
			.subscribe(
				(result) => {
					this.resultListTasks = result;
				}
			);
	}

	// Métodos para update - PUT
	public openModalUpdate(row: { id: any, titulo: any, desc: any, criacao: any, edicao: any, status: any }) {
		this.getRowEdit = row;
	}

	// Update Tasks - PUT
	updateTask(row: { id: any; }) {
		this.http.put(`${this.apiURL}/${row.id}`, row).subscribe(() =>
			this.http.get(`${this.apiURL}`).subscribe(
				(resultado) => {
					this.resultListTasks = resultado;
					this.titleDelete;
				}
			));
	}
	// Fim dos métodos para update

	// Métodos para Insert - POST
	openModalInsert() {
		this.newTask;
	}

	// Insert Tasks - POST
	insertTask(row: any) {
		this.http.post(`${this.apiURL}`, row).subscribe(() =>
			this.http.get(`${this.apiURL}`).subscribe(
				(resultado) => {
					this.resultListTasks = resultado;
					this.newTask = {
						titulo: '',
						desc: '',
						criacao: new Date().toLocaleDateString(),
						edicao: new Date().toLocaleDateString(),
						status: 'New'
					}
				}
			));
	}
	// Fim dos métodos para Insert

	// Delete Tasks - DELETE
	deleteTasks() {
		let _id = this.modelDelete;
		this.http.delete(`${this.apiURL}/${_id.id}`).subscribe(() =>
			this.http.get(`${this.apiURL}`).subscribe(
				(resultado) => {
					this.resultListTasks = resultado;
				}
			));
	}

	// Modal de comfirmação de exclusão
	openModalConfirm(row: any) {
		this.titleDelete = row.titulo; 
	}

	// Marcando como Concluída
	setOk(row: any){
		let _status = row;
		let newStatus = 'Concluída';
		_status.status = newStatus;
		this.http.put(`${this.apiURL}/${_status.id}`, _status).subscribe(() =>
			this.http.get(`${this.apiURL}`).subscribe(
				(resultado) => {
					this.resultListTasks = resultado;
				}
			));
	}

	// Métodos ao carregar a view
	ngOnInit() {
		this.listarTasks();
	}
}