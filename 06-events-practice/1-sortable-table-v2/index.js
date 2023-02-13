export default class SortableTable {
  element;
  subElements = {};
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.tableTemplate;
    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.sort();
    this.eventListener();
  }

  eventListener() {
    this.subElements.header.addEventListener('pointerdown', (event) => {
      if (event.target.closest('[data-sortable="true"]')) {
        const column = event.target.closest('[data-sortable="true"]');
        const { id, order } = column.dataset;
        const arrow = column.querySelector('.sortable-table__sort-arrow');
        const toggleOrder = order => {
          const orders = {
            asc: 'desc',
            desc: 'asc'
          };

          return orders[order];
        };

        column.dataset.order = toggleOrder(order);

        this.sort(id, toggleOrder(order));

        if (!arrow) {
          column.append(this.subElements.arrow);
        }
      }
    });
  }

  sort(fieldValue = 'title', orderValue = 'asc') {
    const sortedData = this.sortData(fieldValue, orderValue);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = orderValue;

    if (sortedData) {
      this.subElements.body.innerHTML = this.getBodyCells(sortedData);
    }
  }

  sortData(fieldValue, orderValue) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === fieldValue);
    const { sortType, customSorting } = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[orderValue];

    return arr.sort((a, b) => {
      if (sortType === 'number') {
        return direction * (a[fieldValue] - b[fieldValue]);
      }
      if (sortType === 'string') {
        return direction * a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en']);
      }
      if (sortType === 'custom') {
        return direction * customSorting(a, b);
      }
    });
  }

  get tableTemplate() {
    return `
      <div class="sortable-table">

        ${this.headerTemplate}

        ${this.bodyTemplate}

      </div>
    `;
  }

  get headerTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerCells}
      </div>
    `;
  }

  get headerCells() {
    return this.headerConfig.map(el => {
      return `
        <div class="sortable-table__cell" data-id="${el.id}" data-sortable="${el.sortable}">
          <span>${el.title}</span>
          <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>
        </div>
      `;
    }).join('');
  }

  get bodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getBodyCells(this.data)}
      </div>
    `;
  }

  getBodyCells(data) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getBodyCell(item)}
        </a>
      `;
    }).join('');
  }

  getBodyCell(item) {
    return this.headerConfig.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.getSubElements = null;
  }
}
