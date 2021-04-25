export default class SortableTable {
    constructor(header = [], {
        data = [],
        sorted = {}
    } = {}) {
        this.header = header;
        this.data = data;
        this.sorted = sorted;

        this.render();
        this.init();
    }

    getSort = event => {
        const dataId = event.target.closest('[data-id]');
        const currentSort = this.header.find(item => item.id === dataId.dataset.id);
        const { id } = currentSort;        
        const sortableParam = currentSort.sortable;

        const orders = {
            asc: 'asc',
            desc: 'desc'
        }

        if (sortableParam) {
            const dataOrder = dataId.dataset.order;
            const tableBody = document.getElementById('table-body');
            const tableHeader = document.getElementById('table-header');
            const arrows = tableHeader.querySelectorAll('.sortable-table__cell');

            if(dataOrder === '') {
                arrows.forEach(el => el.dataset.order = '');
                dataId.dataset.order = this.sorted.order;
            } else {
                dataId.dataset.order = dataId.dataset.order === orders.asc ? orders.desc : orders.asc;

                this.sorted.order = dataId.dataset.order;
            }

            tableBody.childNodes.forEach(el => el.remove());

            tableBody.innerHTML = this.getBody(this.sort(id, this.sorted.order))
        }
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
            <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-sort-type="data" data-order="${id === this.sorted.id ? this.sorted.order : ''}">
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
                    <div id="table-header" data-element="header" class="sortable-table__header sortable-table__row">
                        ${this.getHeader()}
                    </div>

                    <div id="table-body" data-element="body" class="sortable-table__body">
                        ${this.getBody(this.sort(this.sorted.id, this.sorted.order))}
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
        const currentSort = this.header.find(item => item.id === field);
        const { sortType } = currentSort;
        
        const direction = {
            'asc' : 1,
            'desc' : -1
        }

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

        return result;
    }

    init() {
        document.addEventListener('click', this.getSort);
    }

    remove() {
        this.element.remove();
        document.removeEventListener('click', this.getSort);
    }

    destroy() {
        this.remove();
    }
}
