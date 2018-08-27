import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcapitalassetComponent } from './setcapitalasset.component';

describe('PricingComponent', () => {
  let component: SetcapitalassetComponent;
  let fixture: ComponentFixture<SetcapitalassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetcapitalassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetcapitalassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
