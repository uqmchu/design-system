'use strict';

/**
 * Header module
 * @file Handles interaction behaviour for the Header. Does not output any
 * HTML elements.
 * TODO: make this class configurable
 */

class header {
  constructor() {
    this.init();
  }

  init() {
    this.toggle = document.querySelector('.uq-header__search-toggle-button');
    this.search = document.querySelector('.uq-header__search');
    this.searchInput = document.querySelector('.uq-header__search-query-input');
    this.meta = document.querySelector('meta.uq-header__mq--desktop');

    if (this.meta == null) {
      this.meta = document.createElement('meta');
      this.meta.classList.add('uq-header__mq--desktop');
      document.head.appendChild(this.meta);
    };

    this.mqLarge = window.getComputedStyle(this.meta).getPropertyValue('font-family');
    this.mqLarge = this.mqLarge.trim().slice(1, -1); // browsers re-quote string style values
    this.mqLargeList = window.matchMedia(this.mqLarge);

    this.toggle.addEventListener('click', () => {
      this.handleToggle();
    });
  }

  mobileGlobalNav() {
    let mobileNavLinks = document.querySelectorAll('.uq-header__navigation-list-item a');
    let mobileNavContainer = document.querySelector('.uq-header__navigation--mobile ul');

    for (let link of mobileNavLinks) {
      let li = document.createElement('li');
      mobileNavContainer.appendChild(li);
      li.appendChild(link);
    }
  }

  handleToggle() {
    this.toggle.classList.toggle('uq-header__search-toggle-button--icon-close');
    this.search.classList.toggle('uq-header__search--open');

    if (this.search.classList.contains('uq-header__search--open')) {
      if (this.mqLargeList.matches) {
        this.searchInput.focus();
      } else {
        this.toggle.blur();
        this.mobileGlobalNav();
      }
    } else {
      this.toggle.blur();
    }
  }
};

export {header as default};
