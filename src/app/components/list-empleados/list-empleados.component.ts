import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpleadoService } from './../../services/empleado.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.scss']
})
export class ListEmpleadosComponent implements OnInit {

  empleados : any[] = [];
  
  constructor(private empleadoService: EmpleadoService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe( data=> {
      this.empleados = [];
      data.forEach((element:any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    })
  }

  eliminarEmpleado(id: string){
    this.empleadoService.eliminarEmpleado(id).then(() => {
      this.toastr.error('El empleado fue eliminado con exito!', 'Registro eliminado');
    }).catch(error => {
      console.log(error);
    });
  }

}
