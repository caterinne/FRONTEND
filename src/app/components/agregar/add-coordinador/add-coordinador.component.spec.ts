import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinadorComponent } from './add-coordinador.component';

describe('AddCoordinadorComponent', () => {
  let component: AddCoordinadorComponent;
  let fixture: ComponentFixture<AddCoordinadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoordinadorComponent]
    });
    fixture = TestBed.createComponent(AddCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
