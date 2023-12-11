import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  private conveniosVigentesSubject = new BehaviorSubject<number>(0);
  conveniosVigentes$ = this.conveniosVigentesSubject.asObservable();


  private conveniosPorCaducarSubject = new BehaviorSubject<number>(0);
  conveniosPorCaducar$ = this.conveniosPorCaducarSubject.asObservable();

  private conveniosNacionalesSubject = new BehaviorSubject<number>(0);
  conveniosNacionales$ = this.conveniosNacionalesSubject.asObservable();

  private conveniosInternacionalesSubject = new BehaviorSubject<number>(0);
  conveniosInternacionales$ = this.conveniosInternacionalesSubject.asObservable();

  setConveniosVigentes(total: number) {
    this.conveniosVigentesSubject.next(total);
  }


  setConveniosPorCaducar(total: number) {
    this.conveniosPorCaducarSubject.next(total);
  }
  setConveniosNacionales(total: number) {
    this.conveniosNacionalesSubject.next(total);
  }

  setConveniosInternacionales(total: number) {
    this.conveniosInternacionalesSubject.next(total);
  }
}
