import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CafeListComponent } from './cafe-list.component';
import { Cafe } from '../cafe';
import { environment } from '../../../environments/environment';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let httpMock: HttpTestingController;
  let debug: HTMLElement;

  // El listado de 3 cafés que pide el enunciado
  const cafes: Cafe[] = [
    new Cafe(1, 'Café Especial para tí', 'Blend', 'Angelópolis, Antioquia', 'Panela, Durazno', 1920, 'img1.jpg'),
    new Cafe(2, 'Café Especial Navegante', 'Café de Origen', 'Guatapé, Antioquia', 'Cítrico, Cacao', 1800, 'img2.png'),
    new Cafe(3, 'Café Especial Valentina', 'Café de Origen', 'Fredonia, Antioquia', 'Chocolate, Nuez', 1700, 'img3.jpg')
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    debug = fixture.nativeElement;

    fixture.detectChanges();                              // ejecuta ngOnInit → se hace el GET
    httpMock.expectOne(environment.baseUrl).flush(cafes); // respondemos con los 3 cafés
    fixture.detectChanges();                              // Angular pinta la tabla
  });

  afterEach(() => {
    httpMock.verify(); // confirma que no quedaron peticiones sin responder
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table with 3 rows plus the header', () => {
    const headerRows = debug.querySelectorAll('table thead tr');
    const bodyRows = debug.querySelectorAll('table tbody tr');

    expect(headerRows.length).toBe(1);
    expect(bodyRows.length).toBe(3);
    expect(debug.querySelectorAll('table tr').length).toBe(4);
  });

  it('should show the nombre, tipo and región of each coffee', () => {
    const bodyRows = debug.querySelectorAll('table tbody tr');

    bodyRows.forEach((row, i) => {
      const cells = row.querySelectorAll('th, td');
      expect(cells[1].textContent?.trim()).toBe(cafes[i].nombre);
      expect(cells[2].textContent?.trim()).toBe(cafes[i].tipo);
      expect(cells[3].textContent?.trim()).toBe(cafes[i].region);
    });
  });

  it('should show the total of coffees by type', () => {
    expect(debug.querySelector('.total-origen')?.textContent).toContain('Total café de origen: 2');
    expect(debug.querySelector('.total-blend')?.textContent).toContain('Total café blend: 1');
  });
});