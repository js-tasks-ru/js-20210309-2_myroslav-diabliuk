export default class SortableTable {
    constructor(header = [], {
        data = []
    } = {}) {
        this.header = header;
        this.data = data;

        this.render();
    }

    getHeader() {
        let header = [];

        for (let i = 0; i < this.header.length; i++) {
            header += 
            `
                <div class="sortable-table__cell" data-id="${this.header[i].id}" data-sortable="${this.header[i].sortable}" data-sort-type="data">
                    <span>${this.header[i].title}</span>
                    <span data-element="arrow" class="sortable-table__sort-arrow">
                        <span class="sort-arrow"></span>
                    </span>
                </div>
            `
        }

        return header;
    }

    getTableRow(dataObjects) {
        let body = [];

        for (let i = 0; i < dataObjects.length; i++) {
            body += 
            `
                <a href="#" class="sortable-table__row">
                    <div class="sortable-table__cell">
                    </div>
                    <div class="sortable-table__cell">${dataObjects[i].title}</div>
            
                    <div class="sortable-table__cell">${dataObjects[i].quantity}</div>
                    <div class="sortable-table__cell">${dataObjects[i].price}</div>
                    <div class="sortable-table__cell">${dataObjects[i].sales}</div>
                </a>
            `
        }

        return body;

    }
    
    get createTemplate() {
        return `
            <div data-element="productsContainer" class="products-list__container">
                <div class="sortable-table">
                    <div data-element="header" class="sortable-table__header sortable-table__row">
                        ${this.getHeader()}
                    </div>

                    <div data-element="body" class="sortable-table__body">
                        ${this.getTableRow(this.data)}
                    </div>
                </div>
            </div>
        `
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.createTemplate;

        this.element = element.firstElementChild;
    }

    sort(field, direction) {
        const arr = [...this.data];
        const tableBody = document.querySelector('.sortable-table__body');
        const list = tableBody.querySelectorAll('.sortable-table__row');
        const { sortType } = this.header.find(item => item.id === field);
        const dir = {
            'asc' : 1,
            'desc' : -1
        }

        console.dir(sortType);

        let result = [];

        list.forEach(el => el.remove());

        result = arr.sort((a, b) => {
            switch (sortType) {
                case 'number':
                    return dir[direction] * (a[field] - b[field]);
                case 'string':
                    return dir[direction] * a[field].localeCompare(b[field], ['ru', 'en']);
                default:
                    return dir[direction] * (a[field] - b[field]);
            }
        });

        tableBody.innerHTML = this.getTableRow(result);
    }

    destroy() {
        this.element.remove();
    }
}
