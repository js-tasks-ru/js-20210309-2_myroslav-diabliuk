export default class ColumnChart {
    chartHeight = 50;

    constructor({data = [], label = '', link = '', value = 0} = {}) {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;

        this.render();
    }

    getValue() {
        return `<div class="column-chart__title">${this.label}</div>`;
    }

    getColumn(data) {
        const maxValue = Math.max(...data);
        const scale = 50 / maxValue;
       
        return data.map(item => {
            const percent = (item / maxValue * 100).toFixed(0) + '%';
            const value = String(Math.floor(item * scale));
            
            return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
        }).join('');
    }

    getLink() {
        return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
    }

    getValue() {
        return `<div data-element="header" class="column-chart__header">${this.value}</div>`
    }

    get createTemplate() {
        return `
            <div class="column-chart ${this.data.length ? '' : 'column-chart_loading'}" style="--chart-height: ${this.chartHeight}">
                <div class="column-chart__title">
                    Total ${this.label}
                    ${this.getLink()}
                </div>
                <div class="column-chart__container">
                    ${this.getValue()}
                    <div data-element="body" class="column-chart__chart">
                        ${this.getColumn(this.data)}
                    </div>
                </div>
            </div>
        `
    }

    update() {}

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.createTemplate;

        this.element = element.firstElementChild;
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
