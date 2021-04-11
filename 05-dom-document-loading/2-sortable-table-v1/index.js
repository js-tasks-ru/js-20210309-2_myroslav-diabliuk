export default class SortableTable {
    constructor(header = [], {
        data = []
    } = {}) {
        this.header = header;
        this.data = data;

        this.render();
    }
    
    get getArrow() {
        return `
            <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
            </span>
        `;
    }

    getHeaderCell({id, title, sortable}) {
        return `
            <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-sort-type="data">
                <span>${title}</span>
                ${id !== 'images' ? this.getArrow : ''}
            </div>
        `;
    }

    getHeader() {
        return this.header.map(item => this.getHeaderCell(item)).join('');
    }

    getBodyRow({id, images, title, quantity, price, sales}) {
        return `
            <a href="/product/${id}" class="sortable-table__row">
                <div class="sortable-table__cell">
                    <img class="sortable-table-image" alt="Image" src="${images[0].url}">
                </div>
                <div class="sortable-table__cell">
                    ${title}
                </div>
                <div class="sortable-table__cell">
                    ${quantity}
                </div>
                <div class="sortable-table__cell">
                    ${price}
                </div>
                <div class="sortable-table__cell">
                    ${sales}
                </div>
            </a>
        `;
    }

    getBody(dataObjects) {
        return dataObjects.map(item => this.getBodyRow(item)).join("");
    }
    
    get createTemplate() {
        return `
            <div data-element="productsContainer" class="products-list__container">
                <div class="sortable-table">
                    <div data-element="header" class="sortable-table__header sortable-table__row">
                        ${this.getHeader()}
                    </div>

                    <div id="body" data-element="body" class="sortable-table__body">
                        ${this.getBody(this.data)}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.createTemplate;

        this.element = element.firstElementChild;
    }

    sort(field, value) {
        const arr = [...this.data];
        const tableBody = document.querySelector('.sortable-table__body');
        const list = tableBody.querySelectorAll('.sortable-table__row');
        const currentSort = this.header.find(item => item.id === field);
        const { sortType } = currentSort;
        
        const direction = {
            'asc' : 1,
            'desc' : -1
        }
        
        list.forEach(el => el.remove());

        const result = arr.sort((a, b) => {
            switch (sortType) {
                case 'number':
                    return direction[value] * (a[field] - b[field]);
                case 'string':
                    return direction[value] * a[field].localeCompare(b[field], ['ru', 'en']);
                default:
                    return direction[value] * (a[field] - b[field]);
            }
        });

        // set arrow

        const tableHeader = document.querySelector('.sortable-table__header');
        const tableHeaderCells = tableHeader.querySelectorAll(`.sortable-table__cell`);
        const index = this.header.findIndex(item => item.id === field);

        tableHeaderCells.forEach(el => el.removeAttribute('data-order'));
        tableHeaderCells[index].dataset.order = value;

        // render sorted list
        tableBody.innerHTML = this.getBody(result);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
