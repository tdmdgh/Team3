import { category } from '../../common/constants';

class DropdownCategory {
  toggleElement: HTMLAnchorElement;
  itemsElemnt: HTMLElement;
  constructor() {
    this.toggleElement = document.createElement('a');
    this.itemsElemnt = document.createElement('div');
    this.render();
    // store.subscribe(() => this.render());
  }
  render() {
    this.toggleElement.classList.add('nav-link', 'dropdown-toggle', 'category');
    // this.toggleElement.dataset['bs-toggle'] = 'dropdown';
    this.toggleElement.href = '#';
    this.toggleElement.role = 'button';
    this.toggleElement.ariaHasPopup = 'true';
    this.toggleElement.ariaExpanded = 'false';
    this.toggleElement.innerHTML = '카테고리를 선택하세요';

    this.itemsElemnt.classList.add('dropdown-menu');
    this.generateDropDownItems();

    // // this.toggleElement.addEventListener('click', this.handleToggle.bind(this));
    // // this.itemsElemnt.addEventListener('click', this.handleToggle.bind(this));
    document.addEventListener('click', (e) => {
      const target = e.target as Element;
      const dropDown = target?.closest(
        '.dropdown-toggle.category'
      ) as HTMLAnchorElement;
      if (dropDown === null) this.dropDownClose();
      else this.handleToggle();
    });

    Array.from(this.itemsElemnt.children).forEach((item) => {
      item.addEventListener('click', () => {
        this.toggleElement.innerHTML = item.innerHTML;
      });
    });
  }
  generateDropDownItems() {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('dropdown-item-wrapper', 'category');
    for (const key in category) {
      itemWrapper.innerHTML += `<div class="dropdown-item category" data-category-title="축구">
        <img style="width: 25px;" src="../../../assets/category/icons/${key}.png" alt="">
        <span>${category[key]}</span>
      </div>`;
    }

    itemWrapper.innerHTML += `<div class="dropdown-divider"></div>`;

    const defaultItem = document.createElement('a');
    defaultItem.classList.add('dropdown-item');
    defaultItem.href = '#'; //key
    defaultItem.innerHTML = '카테고리 선택하세요';
    itemWrapper.appendChild(defaultItem);

    this.itemsElemnt.append(itemWrapper);
  }
  handleToggle() {
    if (this.toggleElement.classList.contains('show')) this.dropDownClose();
    else this.dropDownOpen();
  }
  dropDownOpen() {
    this.toggleElement.classList.add('show');
    this.toggleElement.setAttribute('aria-expanded', 'true');

    this.itemsElemnt.classList.add('show');
    this.itemsElemnt.setAttribute('data-bs-popper', 'static');
  }
  dropDownClose() {
    this.toggleElement.classList.remove('show');
    this.toggleElement.setAttribute('aria-expanded', 'false');

    this.itemsElemnt.classList.remove('show');
    this.itemsElemnt.removeAttribute('data-bs-popper');
  }
}
export default DropdownCategory;
