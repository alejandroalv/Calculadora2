import {Component, Input} from '@angular/core';
import {Capacitor} from './capacitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tipoCircuito = 'serieCapacitor';
  urlFormula = 'Capacitores en serie';
  resultado: number = 0;
  blockAddButton = true;
  magnitud = 'μF';

  @Input() listadoCapacitores: Capacitor[] = [
    { valor: 0, tipo: 'μF' },
    { valor: 0, tipo: 'μF' }
  ];
  private item: any;


   unidadesMedidaCapacitores: string[] = ['μF' , 'mF', 'nF', 'pF'];
  unidadesMedidaResistencias: string[] = ['Ω'];


  doSomething(item) {
    if (item === 'serieCapacitor') {
      this.tipoCircuito = 'serieCapacitor';
      this.magnitud = 'μF';
      this.urlFormula = 'Capacitores en serie';
    } else if (item === 'paraleloCapacitor') {
      this.tipoCircuito = 'paraleloCapacitor';
      this.magnitud = 'μF';
      this.urlFormula = 'Capacitores en paralelo';
    } else if (item === 'serieResistencia') {
      this.tipoCircuito = 'serieResistencia';
      this.magnitud = 'Ω';
      this.urlFormula = 'Resistencias en serie';
    } else if (item === 'paraleloResistencia') {
      this.tipoCircuito = 'paraleloResistencia';
      this.magnitud = 'Ω';
      this.urlFormula = 'Resistencias en paralelo';
    }
    this.limpiar();
  }

  agregarCapacitor() {
    this.listadoCapacitores.push({ valor: 0, tipo: 'μF' });
    this.calcular();

    this.validarActivacionBoton();
  }

  quitarCapacitor() {
    if (this.listadoCapacitores.length > 2) {
      this.listadoCapacitores.splice(this.listadoCapacitores.length - 1, 1);
      this.calcular();
    }

    this.validarActivacionBoton();
  }

  calcular() {
    this.resultado = 0;
    let i;
    if (this.tipoCircuito === 'serieCapacitor') {
      let total = 0;
      for (i = 0; i < this.listadoCapacitores.length; i++) {
        if (this.listadoCapacitores[i].valor !== 0 && this.listadoCapacitores[i].valor !== undefined) {
          let operacion = 1;

          if (this.listadoCapacitores[i].tipo === 'μF') {
            total = ((1 / +this.listadoCapacitores[i].valor)) + total;
          }

          if (this.listadoCapacitores[i].tipo === 'mF') {
            operacion = Math.pow(10, -3);
            total = ((1 / +this.listadoCapacitores[i].valor) * operacion) + total;
          }

          if (this.listadoCapacitores[i].tipo === 'nF') {
            operacion = Math.pow(10, -3);
            total = ((1 / +this.listadoCapacitores[i].valor) / operacion) + total;
          }

          if (this.listadoCapacitores[i].tipo === 'pF') {
            operacion = Math.pow(10, -6);
            total = ((1 / +this.listadoCapacitores[i].valor) / operacion) + total;
          }


        }
      }
      if (total !== 0) {
        this.resultado = 1 / total;
      }

    } else if (this.tipoCircuito === 'paraleloCapacitor') {
      for (i = 0; i < this.listadoCapacitores.length; i++) {

        let operacion = 1;

        if (this.listadoCapacitores[i].tipo === 'μF') {
          this.resultado = +this.listadoCapacitores[i].valor * operacion + +this.resultado;
        }

        if (this.listadoCapacitores[i].tipo === 'mF') {
          operacion = Math.pow(10, -3);
          this.resultado = +this.listadoCapacitores[i].valor * operacion + +this.resultado;
        }

        if (this.listadoCapacitores[i].tipo === 'nF') {
          operacion = Math.pow(10, -3);
          this.resultado = +this.listadoCapacitores[i].valor * operacion + +this.resultado;
        }

        if (this.listadoCapacitores[i].tipo === 'pF') {
          operacion = Math.pow(10, -6);
          this.resultado = +this.listadoCapacitores[i].valor * operacion + +this.resultado;
        }
      }
    } else if (this.tipoCircuito === 'paraleloResistencia') {

      let total = 0;
      for (i = 0; i < this.listadoCapacitores.length; i++) {
        total = ((1 / +this.listadoCapacitores[i].valor)) + total;
      }
      this.resultado = 1 / total;

    } else if (this.tipoCircuito === 'serieResistencia') {
      for (i = 0; i < this.listadoCapacitores.length; i++) {
        this.resultado = +this.listadoCapacitores[i].valor + +this.resultado;
      }
    }
  }

  limpiar() {
    this.listadoCapacitores = [
      { valor: 0, tipo: 'μF' },
      { valor: 0, tipo: 'μF' }
    ];
    this.resultado = 0;


  }

  validarActivacionBoton() {
    if (this.listadoCapacitores.length === 2) {
      this.blockAddButton = true;
    } else {
      this.blockAddButton = false;
    }
  }

}
