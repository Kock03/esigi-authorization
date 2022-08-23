import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRegisterComponent } from './module-register.component';

describe('ModuleRegisterComponent', () => {
  let component: ModuleRegisterComponent;
  let fixture: ComponentFixture<ModuleRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
