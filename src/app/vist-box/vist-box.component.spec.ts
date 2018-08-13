import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistBoxComponent } from './vist-box.component';

describe('VistBoxComponent', () => {
  let component: VistBoxComponent;
  let fixture: ComponentFixture<VistBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
