import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRegisterComponent } from './screen-register.component';

describe('ScreenRegisterComponent', () => {
  let component: ScreenRegisterComponent;
  let fixture: ComponentFixture<ScreenRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
