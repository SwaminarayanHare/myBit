import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveNavComponent } from './live-nav.component';

describe('LiveNavComponent', () => {
  let component: LiveNavComponent;
  let fixture: ComponentFixture<LiveNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
