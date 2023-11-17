import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioDetalleComponent } from './convenio-detalle.component';

describe('ConvenioDetalleComponent', () => {
  let component: ConvenioDetalleComponent;
  let fixture: ComponentFixture<ConvenioDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvenioDetalleComponent]
    });
    fixture = TestBed.createComponent(ConvenioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
