import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import data from 'src/assets/response.json';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private data: DataService) { }

  title = 'test-app';

  searchText: any;
  outputText: any;


  search() {
    this.data.sparql("SELECT * WHERE{ ?s ?p ?o . }").subscribe(res => {
      console.log(res);
      this.outputText = ''
      res['results']['bindings'].forEach((triple: any) => {
        if (triple.o.value === 'http://www.w3.org/2002/07/owl#NamedIndividual') {
          this.outputText += triple.s.value.split('#')[1] + '\n'
        }
      })
    })

    // this.outputText = JSON.stringify(data.results.bindings[0])
  }

  // loginForm = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   pass: new FormControl('', Validators.required)
  // });

  // tryLogin() {
  //   console.log("Logging in...");
  //   console.log("EMAIL: ",this.loginForm.controls['email'].value);
  //   console.log("PASSWORD: ",this.loginForm.controls['pass'].value);
  //   // this.http.get(this.apiURL).subscribe(res=>{console.log(res);});
  //   this.http.post<any>(this.apiURL, 
  //   {email: this.loginForm.controls['email'].value, 
  //   pass:this.loginForm.controls['pass'].value 
  //   }).subscribe(res=>{
  // 	  console.log("API RESPONSE: ", res);
  // 	  this.loginValid = res.result;
  //   });
  // }


}
