import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PracticeTodoList } from 'src/app/core/models/practice-todo.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { PracticeTodoService } from 'src/app/core/services/practice-todo.service';
import * as moment from "moment";

@Component({
  selector: 'dashboard-sidebar-content-todo',
  templateUrl: './dashboard-sidebar-content-todo.component.html',
  styleUrls: ['./dashboard-sidebar-content-todo.component.scss']
})
export class DashboardSidebarContentTodoComponent implements OnInit {
  todolists: PracticeTodoList;
  addNewTodoActive: boolean = false;
  todoFormGroup: FormGroup;

  constructor(
    private practiceTodoService: PracticeTodoService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder
  ) {
    this.todoFormGroup = this.formBuilder.group({
      date: [null, Validators.required],
      todo: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.practiceTodoService.getAll().subscribe((res) => this.todolists = res);
  }

  onAddTodo() {
    if (this.todoFormGroup.invalid) return;
    const { date, todo } = this.todoFormGroup.value;
    const momentDate = moment(date);
    this.practiceTodoService.create({ date: momentDate.format('YYYY-MM-DD HH:mm:ss'), todo }).subscribe({
      next: (res) => {
        this.getTodos();
        this.toggleTodoInput();
        this.todoFormGroup.reset();
      },
      error: (error) => this.globalService.handleError(error)
    })
  }

  toggleTodoInput() {
    this.addNewTodoActive = !this.addNewTodoActive;
  }
}
