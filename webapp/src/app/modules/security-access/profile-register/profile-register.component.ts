import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ModuleProvider } from 'src/providers/module.provider';

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
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder
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
    this.dataSource.data = this.modules;
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      Role: {
        name: '',
        Acess: this.fb.array([{ use: false, Screens: [{ id: '' }] }]),
        Add: this.fb.array([{ use: false, Screens: [{ id: '' }] }]),
        Updade: this.fb.array([{ use: false, Screens: [{ id: '' }] }]),
        Delete: this.fb.array([{ use: false, Screens: [{ id: '' }] }]),
      },
    });

    if (this.data) {
      this.profileForm.patchValue(this.data);
    }
  }

  save() {
    let data = this.profileForm.getRawValue();
    console.log(data);
  }
}
-74;
