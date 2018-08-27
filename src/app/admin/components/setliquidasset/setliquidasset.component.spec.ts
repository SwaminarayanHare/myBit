import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetliquidassetComponent } from './setliquidasset.component';

describe('SetliquidassetComponent', () => {
  let component: SetliquidassetComponent;
  let fixture: ComponentFixture<SetliquidassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetliquidassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetliquidassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
