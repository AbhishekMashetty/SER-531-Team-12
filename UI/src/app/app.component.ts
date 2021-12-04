import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import data from 'src/assets/response.json';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private data: DataService) { }

  title = 'SER-531-Team-12';

  searchText: any;
  outputText: any;
  select;
  entities: any[] = [];

  ngOnInit() {
    this.getEntities();
  }


  search() {
    let outMap = {}
    let inMap = {}

    let query
    if (this.searchText) {
      query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
        "SELECT ?s ?p ?o WHERE{ ?s rdfs:label ?name . " +
        "?s ?p ?o" +
        " FILTER( regex(?name, \"" + this.searchText + "\", \"i\" ) )  }"
    } else {
      query = "SELECT * WHERE{ ?s ?p ?o . }"
    }
    this.data.sparql(query).subscribe(res => {
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
        let txt: String[] = [];
        if (triple.p.value.split('#')[1] != 'type' && triple.p.value.split('#')[1] != 'label') {
          ['s', 'p', 'o'].forEach(x => {
            if (triple[x].type === 'uri') {
              txt.push("<" + triple[x].value + ">")
            } else if (triple[x].type === 'literal') {
              txt.push("\"" + triple[x].value + "\"")
            }
          })
          this.outputText += txt[0] + ' ' + txt[1] + ' ' + txt[2] + ' .\n'
        }
      })

      console.log(inMap)
      console.log(outMap)
      // Object.keys(outMap).forEach(x => {
      //   this.outputText += '#' + x.split('#')[1] + ' ' + outMap[x].toString() + '\n'
      // })

    })
  }

  getEntities() {
    let query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX law: <http://www.semanticweb.org/law#> " +
      "SELECT ?s ?name WHERE{ ?s rdfs:label ?name .  ?s law:filed ?o } "
    this.data.sparql(query).subscribe(res => {
      console.log(res);
      res['results']['bindings'].forEach((triple: any) => {
        this.entities.push({
          name: triple.name.value,
          uri: triple.s.value
        })
      });
    })
  }

  getPlaintiff() {
    this.searchText = this.select.name;
    this.search();
    return;
    let query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX law: <http://www.semanticweb.org/law#> " +
      "SELECT ?s ?p ?o WHERE { ?s ?p ?o . " + this.select + " ?p ?o .}"
    this.data.sparql(query).subscribe(res => {
      res['results']['bindings'].forEach((triple: any) => {
        let txt: String[] = [];
        if (triple.p.value.split('#')[1] != 'type' && triple.p.value.split('#')[1] != 'label') {
          ['s', 'p', 'o'].forEach(x => {
            if (triple[x].type === 'uri') {
              txt.push("<" + triple[x].value + ">")
            } else if (triple[x].type === 'literal') {
              txt.push("\"" + triple[x].value + "\"")
            }
          })
          this.outputText += txt[0] + ' ' + txt[1] + ' ' + txt[2] + ' .\n'
        }
      });
    })
  }

}
