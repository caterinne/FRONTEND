import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConvenioComponent } from './add-convenio.component';

describe('AddConvenioComponent', () => {
  let component: AddConvenioComponent;
  let fixture: ComponentFixture<AddConvenioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConvenioComponent]
    });
    fixture = TestBed.createComponent(AddConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
