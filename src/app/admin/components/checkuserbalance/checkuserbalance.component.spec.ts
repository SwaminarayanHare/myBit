import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckuserbalanceComponent } from './checkuserbalance.component';

describe('CheckuserbalanceComponent', () => {
  let component: CheckuserbalanceComponent;
  let fixture: ComponentFixture<CheckuserbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckuserbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckuserbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
