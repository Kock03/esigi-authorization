import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRegister.DialogComponent } from './module-register.dialog.component';

describe('ModuleRegister.DialogComponent', () => {
  let component: ModuleRegister.DialogComponent;
  let fixture: ComponentFixture<ModuleRegister.DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleRegister.DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRegister.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
