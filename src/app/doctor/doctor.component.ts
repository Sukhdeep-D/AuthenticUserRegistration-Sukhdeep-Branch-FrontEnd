import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(private doctorService:DoctorService,private toastr:ToastrService,private router:Router,private loginService:LoginService) 
  { }
  frameworkComponents: any;
  DoctorList:Doctor[]=[];
  newDoctor:Doctor=new Doctor();

  ngOnInit(): void {
    this.getAll();
  }

rowData = [];

getAll()
{
   this.doctorService.getAll().subscribe(
    (response)=>{
      this.DoctorList=response.data;
      // console.log(this.DoctorList)
    },
    (error)=>{
      console.log(error);
    }
  )
}

  saveClick()
  {
    this.doctorService.saveDoctor(this.newDoctor).subscribe(
      (response)=>{
        this.getAll();
        this.clearRec();
        console.log(response)
        this.toastr.success("Add Successfully!");

      },
      (error)=>{      
        console.log(error);
      }
    )
  }

  clearRec()
  {
      this.newDoctor.doctorname="";
      this.newDoctor.expierence="";
      this.newDoctor.qualification="";
      this.newDoctor.specialisedIn="";
  }

  editClick(hp:any)
  {
    this.newDoctor=hp;
  }

  updateClick()
  {
      this.doctorService.updateDoctor(this.newDoctor).subscribe(
      (response)=>{
        this.getAll();
        this.toastr.success("Edited Successfully!");

      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteClick(id:number)
  {
    debugger
   this.doctorService.deleteDoctor(id).subscribe(
      (response)=>{
      this.getAll();
      this.toastr.success("Deleted Successfully!");
      },
      (error)=>{
        console.log(error);
      }
     ) 
  }
  onGridReady(params:any)
{
debugger
}

}
