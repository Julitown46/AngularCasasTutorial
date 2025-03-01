import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (submit)="submit()" >
    <h2 class="mb-4 text-center">Registro de Casas</h2>
      <div class="card p-3 mb-4 bg-light w-50 mx-auto">
        <h5 class="card-title">Datos del Evento</h5>
        <div class="mb-3">
            <label for="name" class="form-label">name:</label>
            <input type="text" id="name" class="form-control" placeholder="name" formControlName="name">
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">city:</label>
            <input type="text" id="city" class="form-control" placeholder="city" formControlName="city">
          <div class="mb-3">
            <label for="state" class="form-label">state:</label>
            <input type="text" id="state" class="form-control" placeholder="state" formControlName="state">
          </div>
          <div class="mb-3">
            <label for="photo" class="form-label">photo:</label>
            <input type="text" id="photo" class="form-control" placeholder="photo" formControlName="photo">
          </div>
          <div class="mb-3">
            <label for="availableUnits" class="form-label">availableUnits:</label>
            <input type="number" id="availableUnits" class="form-control" placeholder="availableUnits" formControlName="availableUnits">
          </div>
          <div class="mb-3">
            <input class="form-control" type="checkbox" id="wifi" formControlName="wifi">
            <label class="form-check-label" for="wifi">wifi</label>
        </div>
        <div class="mb-3">
            <input class="form-control" type="checkbox" id="laundry" formControlName="laundry">
            <label class="form-check-label" for="laundry">laundry</label>
        </div>
        <div class="mb-3">
            <label for="latitud" class="form-label">latitud:</label>
            <input type="number" id="latitud" class="form-control" placeholder="latitud" formControlName="latitud">
          </div>
        <div class="mb-3">
            <label for="longitud" class="form-label">longitud:</label>
            <input type="number" id="longitud" class="form-control" placeholder="longitud" formControlName="longitud">
          </div>
          <div class="mb-3">
            <label class="form-label">seguridad:</label>
            <div class="d-flex gap-3 justify-content-center">
              <div class="form-check">
                <input type="checkbox" id="alarmas" value="alarmas" name="seguridad" class="form-check-input"
                  formControlName="alarmas">
                <label for="alarmas" class="form-check-label"> alarmas </label>
              </div>
              <div class="form-check">
                <input type="checkbox" id="puertas" value="puertas" name="seguridad" class="form-check-input"
                  formControlName="puertas">
                <label for="puertas" class="form-check-label"> puertas reforzadas </label>
              </div>
              <div class="form-check">
                <input type="checkbox" id="camaras" value="camaras" name="seguridad" class="form-check-input"
                  formControlName="camaras">
                <label for="camaras" class="form-check-label"> camaras </label>
              </div>
            </div>
          </div>
          </div>
    </div>
    <div class="text-center">
        <button type="submit" class="btn btn-primary">Registrar Casa</button>
      </div>
</form>
  `,
  styles: ``
})
export class FormularioComponent {
form: FormGroup;
housingLocationList: HousingLocation[] = [];

constructor(private fb: FormBuilder, private housingService: HousingService){
  this.form = this.fb.group({
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    photo: [''],
    availableUnits: ['', [Validators.required]],
    latitude: ['', [Validators.required]],
    longitude: ['', [Validators.required]],
    wifi: [false],
    laundry: [false],
    camaras: [false],
    alarmas: [false],
    puertas: [false],
  });

  this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    this.housingLocationList = housingLocationList;
  });
}

ngOnInit(){
  
}

cantidadSeguridad(): string[] {
  const seguridadSeleccionada: string[] = [];
  if (this.form.value.camaras) seguridadSeleccionada.push('camaras');
  if (this.form.value.puertas) seguridadSeleccionada.push('puertas reforzadas');
  if (this.form.value.alarmas) seguridadSeleccionada.push('alarmas');
  return seguridadSeleccionada;
}

submit(){
  if (this.form.valid) {
    const nuevaCasa: HousingLocation = {
      id: this.housingLocationList.length,
      name: this.form.value.name,
      city: this.form.value.city,
      state: this.form.value.state,
      coordinates:{
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
      },
      photo: this.form.value.photo,
      availableUnits: this.form.value.availableUnits,
      wifi: this.form.value.wifi,
      laundry: this.form.value.laundry,
      seguridad: this.cantidadSeguridad()
    };

    this.housingService.addCasa(nuevaCasa);
    this.form.reset();
  } else {
    alert('Por favor, rellene todos los campos');
  }
}

}
