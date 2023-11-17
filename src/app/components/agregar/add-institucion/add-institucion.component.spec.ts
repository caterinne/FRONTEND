import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitucionComponent } from './add-institucion.component';

describe('AddInstitucionComponent', () => {
  let component: AddInstitucionComponent;
  let fixture: ComponentFixture<AddInstitucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInstitucionComponent]
    });
    fixture = TestBed.createComponent(AddInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
