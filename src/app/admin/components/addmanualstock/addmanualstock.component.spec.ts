import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmanualstockComponent } from './addmanualstock.component';

describe('AddmanualstockComponent', () => {
  let component: AddmanualstockComponent;
  let fixture: ComponentFixture<AddmanualstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmanualstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanualstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
