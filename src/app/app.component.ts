import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observ: Observable<string>;
  nomes: string[] = ['joao', 'maria', 'jose', 'pedro','felipe','carlos'];
  nomesFiltro: string[];
  
  
  
  pessoas: any = [
    { id: 1, nome: 'joao', salario: 5000 },
    { id: 2, nome: 'maria', salario: 1000 },
    { id: 3, nome: 'jose', salario: 2000 },
    { id: 4, nome: 'pedro', salario: 3000 },
    { id: 5, nome: 'felipe', salario: 10000 },
    { id: 6, nome: 'carlos', salario: 800 },

  ];

  ngOnInit() {
    this.observ = new Observable(
      subscriber => {
        setInterval(
          () => {
            subscriber.next(this.makeid(5));
          }, 10000
        );
      }
    );

    const lista: Array<string> = [];
    this.observ.subscribe(
      {
        next(x) { lista.push(x); },
        error(err) { alert('ocorreu um erro: ' + err); }
      }
    );

    this.nomes = lista;

  }

  enviar(nome) {
    this.nomes.push(nome);
  }

  makeid(length) {
    let text = '';
    const possible = 'QWERTYUIOPASDFGHJKLÇZXCVBNMqwertyuiopasdfghjklçzxcvbnm0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getValorTotal() {
    return this.pessoas.reduce(
      (soma, pessoa) => soma + pessoa.salario, 0
    );
  }


  buscar(valor: string) {
    if (valor) {
      this.nomesFiltro = this.nomes.filter(
        (nome) => nome.toLowerCase().includes(valor.toLowerCase())
      );
        } else {
         this.nomesFiltro = [];
    }


  }

  buscaCampos(criterio: string) {
    return this.pessoas.filter(
      (pessoa) => Object.keys(pessoa).some(chave => pessoa[chave].toString().includes(criterio))
    );
  }

  buscarId(id) {
    return this.pessoas.find(pessoa => pessoa.id == id);
  }

  aumentarSalario(percentual) {
    this.pessoas.map(
      pessoa => pessoa.salario += pessoa.salario * percentual / 100
    );
  }

}