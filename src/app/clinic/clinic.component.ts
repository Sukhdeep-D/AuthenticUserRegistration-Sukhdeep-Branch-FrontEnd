import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {


  SearchCountryField = SearchCountryField;
  
  separateDialCode = false;
	
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  emailAlredyExist:any;
  phonenumberExist:any;
  existusrname=false;
  existemlname=false;
  existphnname=false;
  userNameExist:any;
ClinicList:Clinic[]=[];
  doctorlist:Doctor=new Doctor();
  DoctorList:Doctor[]=[]
  newClinic:Clinic=new Clinic();
  submitted: boolean = false;
  saveform!:FormGroup
  constructor(private loginService:LoginService,private fb: FormBuilder,private clinicService:ClinicService, public doctorService:DoctorService,private route:Router,private toastr:ToastrService) {
    this.saveform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      facilities:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      address:['',[Validators.required,Validators.maxLength(25), Validators.minLength(3)]],
      // doctorId:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      userName:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      phoneNo:['',[Validators.required]],
    //  address:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
       }) 
   }
  ngOnInit(): void 
  {
    this.getAll();
  }

  getAll()
  {
    
    if(this.loginService.isAuthenticated())
    {
      this.clinicService.getAll().subscribe((response)=>{
  
        this.ClinicList=response.data;
        console.log(this.ClinicList)
      },(error)=>{
      console.log(error)
      })
      }
      else
      return
    }

    saveClick()
  {
    debugger
    this.saveform.value.phoneNo =this.saveform.value.phoneNo.internationalNumber
    if(this.saveform.invalid)
    {
      this.submitted = true;
      return console.error(this.saveform.errors);
      ;
    }

    //alert(this.newHospital.doctorId)
    this.clinicService.saveClinic(this.saveform.value).subscribe(
      (response)=>
      {
        this.emailAlredyExist=response.email
        console.log(this.emailAlredyExist)
        this.userNameExist=response.userName
        console.log(this.userNameExist)
        this.phonenumberExist=response.phoneNo
        console.log(this.phonenumberExist)

if(this.emailAlredyExist==this.saveform.value.email )
{
this.existemlname=true;
}
else if(this.userNameExist==this.saveform.value.userName )
{
 this.existusrname=true;
}

else if(this.phonenumberExist==this.saveform.value.phoneNo )
{
 this.existphnname=true;
}
else
{
  this.route.navigateByUrl('/Clinic')
  this.saveform.reset();
  
  this.getAll();
  //  this.clearRec();
  console.log(response)
  this.toastr.success("Add Successfully!");
} 
 },
      (error)=>{
        console.log(error);

      }
    )
  }
  clearRec(){
      this.newClinic.name="";
        this.newClinic.facilities="";
      
        this.newClinic.userName="";
        this.newClinic.email="";
        this.newClinic.phoneNo=''
        this.newClinic.address=''

       
  }
  editClick(hp:any)
  {
    this.newClinic=hp;
  }
  updateClick()
  {
    this.clinicService.updateClinic(this.newClinic).subscribe(
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
   
     this.clinicService.deleteClinic(id).subscribe(
      (response)=>{
      this.getAll();
      this.toastr.success("Deleted Successfully!");
      },
      (error)=>{
        console.log(error);
      }
     ) 
  }


}
