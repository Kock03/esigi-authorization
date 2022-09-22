import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRegister.DialogComponent } from './screen-register.dialog.component';

describe('ScreenRegister.DialogComponent', () => {
  let component: ScreenRegister.DialogComponent;
  let fixture: ComponentFixture<ScreenRegister.DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenRegister.DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenRegister.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
