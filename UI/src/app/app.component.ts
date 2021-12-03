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
    let outMap = {}
    let inMap = {}
    this.data.sparql("SELECT * WHERE{ ?s ?p ?o . }").subscribe(res => {
      console.log(res);

      this.outputText = ''
      res['results']['bindings'].forEach((triple: any) => {
        if (inMap[triple.o.value]) {
          inMap[triple.o.value] += 1
        } else {
          inMap[triple.o.value] = 1
        }
        if (outMap[triple.s.value]) {
          outMap[triple.s.value] += 1
        } else {
          outMap[triple.s.value] = 1
        }
        // if (triple.o.value === 'http://www.w3.org/2002/07/owl#NamedIndividual') {
        //   this.outputText += triple.s.value.split('#')[1] + '\n'
        // }

      })
      console.log(inMap)
      console.log(outMap)
      Object.keys(outMap).forEach(x => {
        this.outputText += x + ' ' + outMap[x].toString() + '\n'
      })
    })


  }

}
