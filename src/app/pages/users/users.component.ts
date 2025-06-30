import { Component, inject, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { UserFormComponent } from "../../components/user/user-from/user-form.component";
import { UserListComponent } from "../../components/user/user-list/user-list.component";
import { IUser } from "../../interfaces";
import { ModalService } from "../../services/modal.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    UserFormComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public userService: UserService = inject(UserService);
  public modalService: ModalService = inject(ModalService);
  @ViewChild('addUsersModal') public addUsersModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  userForm = this.fb.group({
    id: [''],
    email: ['', Validators.required, Validators.email],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    updatedAt: ['', Validators.required],
  })

  constructor() {
    this.userService.search.page = 1;
    this.userService.getAll();
  }

  saveUser(user: IUser) {
    this.userService.save(user);
    this.modalService.closeAll();
  }

  callEdition(user: IUser) {
    this.userForm.controls['id'].setValue(user.id ? JSON.stringify(user.id) : '');
    this.userForm.controls['email'].setValue(user.email ? user.email : '');
    this.userForm.controls['name'].setValue(user.name ? JSON.stringify(user.name) : '');
    this.userForm.controls['lastname'].setValue(user.lastname ? JSON.stringify(user.lastname) : '');
    this.userForm.controls['password'].setValue(user.password ? JSON.stringify(user.password) : '');
    this.modalService.displayModal('md', this.addUsersModal);
  }

  updateUser(user: IUser) {
    this.userService.update(user);
    this.modalService.closeAll();
  }
  
}
