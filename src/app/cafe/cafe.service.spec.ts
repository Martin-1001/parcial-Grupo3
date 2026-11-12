import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CafeService } from './cafe.service';
import { Cafe } from './cafe';
import { environment } from '../../environments/environment';

describe('CafeService', () => {
  let service: CafeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CafeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the coffees with a GET request', () => {
    const cafes = [new Cafe(1, 'Café', 'Blend', 'Salgar, Antioquia', 'Vino', 1850, 'img.png')];

    service.getCafes().subscribe((result) => {
      expect(result).toEqual(cafes);
    });

    const req = httpMock.expectOne(environment.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(cafes);
  });
});