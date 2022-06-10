import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ModuleProvider } from 'src/providers/module.provider';
import { ProfilesProvider } from 'src/providers/profile.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';

interface PermissionsClass {
  name: string;
  Screens?: [{ name: string }];
}

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss'],
})
export class ProfileRegisterComponent implements OnInit {
  screenAcess: any[] = [];
  screenAdd: any[] = [];
  screenUpdate: any[] = [];
  screenDelete: any[] = [];

  matcher = new ErrorStateMatcherService();
  profileForm!: FormGroup;
  data: [] = [];
  method: string = '';
  profileId!: string;
  dataTable: [] = [];
  displayedColumns: string[] = ['checkbox'];
  modules!: PermissionsClass[];
  permissionControl = new NestedTreeControl<PermissionsClass>(
    (node) => node.Screens
  );
  dataSource = new MatTreeNestedDataSource<PermissionsClass>();

  constructor(
    private profilesProvider: ProfilesProvider,
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService
  ) {}

  hasChild = (_: number, node: PermissionsClass) =>
    !!node.Screens && node.Screens.length > 0;

  ngOnInit(): void {
    this.getModule();
    this.method = sessionStorage.getItem('method')!;
    this.profileId = sessionStorage.getItem('moduleId')!;
    this.initForm();
  }

  async getModule() {
    this.modules = await this.moduleProvider.findAll();

    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules.findIndex(
        (module: any) => module.Screens.length <= 0
      );

      if (module > -1) {
        this.modules.splice(module, 1);
      }
    }
    this.dataSource.data = this.modules;
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      Role: this.fb.group({
        Acess: this.fb.group({ Screens: [] }),
        Add: this.fb.group({ Screens: [] }),
        Update: this.fb.group({ Screens: [] }),
        Delete: this.fb.group({ Screens: [] }),
      }),
    });
  }

  function(event: any, name: string, screenId: string): any {
    let value = this.profileForm.controls['Role'];
    let screen = { id: screenId };

    if (name === 'acess') {
      const id = this.screenAcess.findIndex(
        (register: any) => register.id === screenId
      );
      if (id > -1) {
        this.screenAcess.splice(id, 1);
      } else {
        this.screenAcess.push(screen);
      }
    }

    if (name === 'add') {
      const id = this.screenAdd.findIndex(
        (register: any) => register.id === screenId
      );
      if (id > -1) {
        this.screenAdd.splice(id, 1);
      } else {
        this.screenAdd.push(screen);
      }
    }

    if (name === 'update') {
      const id = this.screenUpdate.findIndex(
        (register: any) => register.id === screenId
      );
      if (id > -1) {
        this.screenUpdate.splice(id, 1);
      } else {
        this.screenUpdate.push(screen);
      }
    }

    if (name === 'delete') {
      const id = this.screenDelete.findIndex(
        (register: any) => register.id === screenId
      );
      if (id > -1) {
        this.screenDelete.splice(id, 1);
      } else {
        this.screenDelete.push(screen);
      }
    }

    let object = {
      Acess: { Screens: this.screenAcess },
      Add: { Screens: this.screenAdd },
      Update: { Screens: this.screenUpdate },
      Delete: { Screens: this.screenDelete },
    };

    value.setValue(object);
  }

  async save() {
    let data = this.profileForm.getRawValue();
    try {
      const save = await this.profilesProvider.store(data);
      this.initForm();
      this.snackbarService.showAlert('Perfil cadastrado com sucesso!');
    } catch (error: any) {
      console.error('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }
}
