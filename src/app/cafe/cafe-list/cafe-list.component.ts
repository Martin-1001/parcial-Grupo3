import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.css'
})
export class CafeListComponent implements OnInit {
  cafes: Cafe[] = [];

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
    });
  }

  contarPorTipo(tipo: string): number {
    return this.cafes.filter(
      (cafe) => cafe.tipo.trim().toLowerCase() === tipo.toLowerCase()
    ).length;
  }

  get totalOrigen(): number {
    return this.contarPorTipo('Café de Origen');
  }

  get totalBlend(): number {
    return this.contarPorTipo('Blend');
  }
}