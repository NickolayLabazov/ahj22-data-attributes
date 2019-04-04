export default class TablFilms {
    constructor() {
      this.films = 0;
      this.counter = 0;
      this.div = 0;
      this.filmRows = [];
    }
  
    filmRowsAr() {
      for (const film of this.films) {
        const filmRow = document.createElement('tr');
        filmRow.setAttribute('data-id', film.id);
        filmRow.setAttribute('data-title', film.title);
        filmRow.setAttribute('data-year', film.year);
        filmRow.setAttribute('data-imdb', film.imdb);
        for (const elem in film) {
          const cell = document.createElement('td');
          if (elem === 'imdb') {
            cell.innerHTML = film[elem].toFixed(2);
          } else {
            cell.innerHTML = film[elem];
          }
          cell.style.padding = '5px';
          cell.style.border = '1px solid black';
          filmRow.appendChild(cell);
        }
        this.filmRows.push(filmRow);
      }
    }
  
    tablCreate() {
      if (this.counter > 0) {
        document.body.removeChild(this.div);
        this.div = 0;
      }
      if (this.counter === 8) {
        this.counter = 0;
      }
  
      this.sortTabl();
      this.div = document.createElement('div');
      this.div.appendChild(this.titleRow());
      document.body.appendChild(this.div);
      for (const filmRow of this.filmRows) {
        this.div.appendChild(filmRow);
      }
  
  
      const arrowSpan = document.createElement('span');
      if (this.counter === 0) {
        arrowSpan.innerHTML = '&#8595';
        this.div.childNodes[0].childNodes[0].appendChild(arrowSpan);
      } else if (this.counter === 1) {
        arrowSpan.innerHTML = '&#8593';
        this.div.childNodes[0].childNodes[0].appendChild(arrowSpan);
      } else if (this.counter === 2) {
        arrowSpan.innerHTML = '&#8595';
        this.div.childNodes[0].childNodes[1].appendChild(arrowSpan);
      } else if (this.counter === 3) {
        arrowSpan.innerHTML = '&#8593';
        this.div.childNodes[0].childNodes[1].appendChild(arrowSpan);
      } else if (this.counter === 4) {
        arrowSpan.innerHTML = '&#8595';
        this.div.childNodes[0].childNodes[2].appendChild(arrowSpan);
      } else if (this.counter === 5) {
        arrowSpan.innerHTML = '&#8593';
        this.div.childNodes[0].childNodes[2].appendChild(arrowSpan);
      } else if (this.counter === 6) {
        arrowSpan.innerHTML = '&#8595';
        this.div.childNodes[0].childNodes[3].appendChild(arrowSpan);
      } else if (this.counter === 7) {
        arrowSpan.innerHTML = '&#8593';
        this.div.childNodes[0].childNodes[3].appendChild(arrowSpan);
      }
  
      setTimeout(() => {
        this.counter += 1;
        this.tablCreate();
      }, 2000);
    }
  
    sortTabl() {
      const compare = (a, b) => {
        if (this.counter === 0) {
          return a.getAttribute('data-id') - b.getAttribute('data-id');
        }
        if (this.counter === 1) {
          return b.getAttribute('data-id') - a.getAttribute('data-id');
        }
        if (this.counter === 2) {
          for (let i = 0; i < Math.min(a.title.length, b.title.length); i += 1) {
            if (a.getAttribute('data-title')[i] > b.getAttribute('data-title')[i]) {
              return 1;
            } if (b.getAttribute('data-title')[i] > a.getAttribute('data-title')[i]) {
              return -1;
            }
          }
          if (a.getAttribute('data-title').length < b.getAttribute('data-title').length) { return -1; }
          return 1;
        }
        if (this.counter === 3) {
          for (let i = 0; i < Math.min(a.getAttribute('data-title').length, b.getAttribute('data-title').length); i += 1) {
            if (a.getAttribute('data-title')[i] < b.getAttribute('data-title')[i]) {
              return 1;
            } if (b.getAttribute('data-title')[i] < a.getAttribute('data-title')[i]) {
              return -1;
            }
          }
          if (a.getAttribute('data-title').length < b.getAttribute('data-title').length) { return 1; }
          return -1;
        }
        if (this.counter === 4) {
          return a.getAttribute('data-imdb') - b.getAttribute('data-imdb');
        }
        if (this.counter === 5) {
          return b.getAttribute('data-imdb') - a.getAttribute('data-imdb');
        }
        if (this.counter === 6) {
          return a.getAttribute('data-year') - b.getAttribute('data-year');
        }
        if (this.counter === 7) {
          return b.getAttribute('data-year') - a.getAttribute('data-year');
        }
      };
  
      this.filmRows.sort(compare);
    }
  
    titleRow() {
      const head = document.createElement('tr');
      for (const elem in this.films[0]) {
        const cell = document.createElement('td');
        cell.innerHTML = elem;      
        cell.style.padding = '5px';
        cell.style.border = '1px solid black';
        head.appendChild(cell);
      }
      return head;
    }
  
    init(films) {
      this.films = films;
      this.filmRowsAr();
      this.tablCreate();
    }
  }