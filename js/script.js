function slider() {
    let offset = 0;
    let sliderLine = document.querySelector('.slider-line');
    let slideWidth = sliderLine.offsetWidth / 3;
    const StatusCircles = document.querySelectorAll('.slider-status-circle');
    let posStatusCircle = 1;
    
    window.addEventListener(`resize`, () => {
        sliderLine.style.transition = 'unset';
        sliderLine = document.querySelector('.slider-line');
        slideWidth = sliderLine.offsetWidth / 3;
        offset = (posStatusCircle - 1) * slideWidth;
        sliderLine.style.left = -offset + 'px';
        sliderLine.style.transition = 'ease 0.5s';
    });
    
    document.querySelector('.slider-buttons__next').addEventListener('click', () => {
        offset += slideWidth;
        if (offset > slideWidth * 2) {
            offset = 0;
        }
        sliderLine.style.left = -offset + 'px';
    
        posStatusCircle += 1;
        if (posStatusCircle > 3) {
            posStatusCircle = 1;
        }
        StatusCirclesActivation();
    });
    
    document.querySelector('.slider-buttons__prev').addEventListener('click', () => {
        offset -= slideWidth;
        if (offset < 0) {
            offset = slideWidth * 2;
        }
        sliderLine.style.left = -offset + 'px';

        posStatusCircle -= 1;
        if (posStatusCircle < 1) {
            posStatusCircle = 3;
        }
        StatusCirclesActivation();
    });

    function StatusCirclesActivation() {
        StatusCircles.forEach(circle => {
            if (circle.dataset.id != posStatusCircle) {
                circle.classList.remove('slider-status-circle_active')
            }
            else {
                circle.classList.add('slider-status-circle_active')
            }
        })
    }
}

function filter() {
    function filterByParameters() {
        const catalogueItems = document.querySelectorAll('.catalogue__item');
        catalogueItems.forEach(elem => {
            const filtered = (parseInt(elem.querySelector('.item__price').textContent.slice(1)) >= parseInt(minPriceIndicator.value) && parseInt(elem.querySelector('.item__price').textContent.slice(1)) <= parseInt(maxPriceIndicator.value)) && (elem.classList.contains(filterCategory) || filterCategory == 'all') && (elem.classList.contains(filterTab) || filterTab == 'all');
            if (filtered && elem.classList.contains('hidden')) {
                elem.classList.remove('hidden')
            }
            else if (!filtered) {
                elem.classList.add('hidden')
            }
        })
    }

    let allPrices = [];
    document.querySelectorAll('.item__price').forEach( elem => {
        allPrices.push(parseInt(elem.innerHTML.slice(1)));
    })
    let minPrice = Math.min.apply(null, allPrices);
    let maxPrice = Math.max.apply(null, allPrices);

    const slider1 = document.querySelector('[data-id="slider-1"]');
    const slider2 = document.querySelector('[data-id="slider-2"]');
    slider1.min = slider2.min = minPrice;
    slider1.max = slider2.max = maxPrice;
    slider1.setAttribute('value', minPrice);
    slider2.setAttribute('value', maxPrice);

    const minPriceIndicator = document.querySelector('.filter-slider__min');
    const maxPriceIndicator = document.querySelector('.filter-slider__max');
    minPriceIndicator.setAttribute('value', minPrice);
    minPriceIndicator.style.width = String(minPrice).length * 8 + 'px';
    maxPriceIndicator.setAttribute('value', maxPrice);
    maxPriceIndicator.style.width = String(maxPrice).length * 8 + 'px';
    const minGap = 20;
    document.querySelector('.filter-slider__from-to').addEventListener('input', event => {
        event.target.style.width = event.target.value.length * 8 + 'px';
    })
    document.querySelector('.filter-slider__from-to').addEventListener('change', event => {
        if (event.target.value < minPrice) {
            event.target.value = minPrice;
        }
        else if (event.target.value > maxPrice) {
            event.target.value = maxPrice;
        }

        if (parseInt(maxPriceIndicator.value) - parseInt(minPriceIndicator.value) < minGap) {
            if (event.target === minPriceIndicator && parseInt(minPriceIndicator.value) + minGap <= maxPrice) {
                maxPriceIndicator.value = parseInt(minPriceIndicator.value) + minGap;
            }
            else if (event.target === minPriceIndicator) {
                maxPriceIndicator.value = maxPrice;
                minPriceIndicator.value = parseInt(maxPriceIndicator.value) - minGap;
            }
            if (event.target === maxPriceIndicator && parseInt(maxPriceIndicator.value) - minGap >= minPrice) {
                minPriceIndicator.value = parseInt(maxPriceIndicator.value) - minGap;
            }
            else if (event.target === maxPriceIndicator) {
                minPriceIndicator.value = minPrice;
                maxPriceIndicator.value = parseInt(minPriceIndicator.value) + minGap;
            }
        }

        slider1.value = minPriceIndicator.value;
        slider2.value = maxPriceIndicator.value;
        minPriceIndicator.style.width = minPriceIndicator.value.length * 8 + 'px';
        maxPriceIndicator.style.width = maxPriceIndicator.value.length * 8 + 'px';
        percent1 = ((parseInt(slider1.value) - minPrice) / (maxPrice - minPrice)) * 100;
        percent2 = ((parseInt(slider2.value) - minPrice) / (maxPrice - minPrice)) * 100;
        sliderTrack.style.background = `linear-gradient(to right, rgba(var(--green-rgb), 0.2) ${percent1}%, var(--green) ${percent1}%, var(--green) ${percent2}%, rgba(var(--green-rgb), 0.2) ${percent2}%)`;

        filterByParameters()
    })
    
    const sliders = document.querySelectorAll('.filter-slider__slider');
    const sliderTrack = document.querySelector('.filter-slider__slider-track')
    sliders.forEach(input => {
        input.addEventListener('input', event => {
            if (parseInt(slider2.value) - parseInt(slider1.value) < minGap) {
                if (event.target === slider1) {
                    slider1.value = parseInt(slider2.value) - minGap;
                }
                else {
                    slider2.value = parseInt(slider1.value) + minGap;
                }
            }

            minPriceIndicator.value = slider1.value;
            minPriceIndicator.style.width = minPriceIndicator.value.length * 8 + 'px';
            maxPriceIndicator.value = slider2.value;
            maxPriceIndicator.style.width = maxPriceIndicator.value.length * 8 + 'px';
            percent1 = ((parseInt(slider1.value) - minPrice) / (maxPrice - minPrice)) * 100;
            percent2 = ((parseInt(slider2.value) - minPrice) / (maxPrice - minPrice)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, rgba(var(--green-rgb), 0.2) ${percent1}%, var(--green) ${percent1}%, var(--green) ${percent2}%, rgba(var(--green-rgb), 0.2) ${percent2}%)`;

            filterByParameters();
        })
    })

    document.querySelector('[data-id="amount_all-plants"]').innerHTML = '(' + document.querySelectorAll('.catalogue__item').length + ')';
    document.querySelector('[data-id="amount_house-plants"]').innerHTML = '(' + document.querySelectorAll('.house-plant').length + ')';
    document.querySelector('[data-id="amount_potted-plants"]').innerHTML = '(' + document.querySelectorAll('.potted-plant').length + ')';
    document.querySelector('[data-id="amount_small-plants"]').innerHTML = '(' + document.querySelectorAll('.small-plant').length + ')';
    document.querySelector('[data-id="amount_big-plants"]').innerHTML = '(' + document.querySelectorAll('.big-plant').length + ')';

    const itemsOnSale = document.querySelectorAll('.sale');

    itemsOnSale.forEach( item => {
        sale = Math.floor((item.querySelector('.item__price-before').innerHTML.slice(1) - item.querySelector('.item__price').innerHTML.slice(1)) /  (item.querySelector('.item__price-before').innerHTML.slice(1) / 100));
        item.querySelector('.item__sale-badge').innerHTML = sale + '% off';
    })
    
    const filterCategories = document.querySelectorAll('.filter__elem');
    const filterTabs = document.querySelectorAll('.catalogue__tab');
    let filterCategory = 'all';
    let filterTab = 'all';

    document.querySelector('.filter__list').addEventListener('click', event => {
        if (!(event.target.closest('.filter__elem'))) return false;

        filterCategories.forEach( item => {
            item.classList.remove('elem_active')
        })
        event.target.closest('.filter__elem').classList.add('elem_active')
        
        filterCategory = event.target.closest('.filter__elem').dataset['filterCategory'];
        
        filterByParameters();
    })

    document.querySelector('.catalogue__tabs').addEventListener('click', event => {
        if (!(event.target.closest('.catalogue__tab'))) return false;

        filterTabs.forEach( item => {
            item.classList.remove('catalogue__tab_active')
        })
        event.target.closest('.catalogue__tab').classList.add('catalogue__tab_active')
        
        filterTab = event.target.closest('.catalogue__tab').dataset['filterCategory'];
        
        filterByParameters();
    })

    const sorterCategories = document.querySelector('.sorter__categories');

    function sorterToggle() {
        document.querySelector('.catalogue__sorter').classList.toggle('sorter_active');
        document.querySelector('.sorter__button').classList.toggle('sorter__button_active');

        if (sorterCategories.style.maxHeight == '') {
            sorterCategories.style.maxHeight = sorterCategories.scrollHeight + 'px';
        }
        else {
            sorterCategories.style.maxHeight = '';
        }
    }

    document.querySelector('.sorter').addEventListener('click', () => {
        sorterToggle();

        function outsideClickListener(event) {
            if (!event.target.closest('.sorter') && sorterCategories.style.maxHeight != '') {
                sorterToggle();
                document.removeEventListener('click', outsideClickListener);
            }
        }

        document.addEventListener('click', outsideClickListener);
    })

    const defaultSorting = document.querySelector('.catalogue__grid').outerHTML;

    document.querySelectorAll('.sorter__category').forEach(item => {
        item.addEventListener('click', event => {
            if (event.target.dataset.id == 'low-to-high') {
                sortingByPrice('lowToHigh');
            }
            else if (event.target.dataset.id == 'high-to-low') {
                sortingByPrice('highToLow');
            }
            else {
                sortingByPrice('default');
            }

            document.querySelector('.sorter__button').textContent = event.target.textContent;
            document.querySelectorAll('.sorter__category').forEach(item => {
                item.style.display = '';
            })
            event.target.style.display = 'none';
        })
    })

    function sortingByPrice(trend) {
        let items = document.querySelector('.catalogue__grid');

        if (trend == 'lowToHigh') {
            for (let i = 0; i < items.children.length; i++) {
                for (let j = i; j < items.children.length; j++) {
                    if (+items.children[i].querySelector('.item__price').textContent.slice(1) > +items.children[j].querySelector('.item__price').textContent.slice(1)) {
                        replacedNode = items.replaceChild(items.children[j], items.children[i]);
                        insertAfter(replacedNode, items.children[i]);
                    }
                }
            }
        }
        else if (trend == 'highToLow') {
            for (let i = 0; i < items.children.length; i++) {
                for (let j = i; j < items.children.length; j++) {
                    if (+items.children[i].querySelector('.item__price').textContent.slice(1) < +items.children[j].querySelector('.item__price').textContent.slice(1)) {
                        replacedNode = items.replaceChild(items.children[j], items.children[i]);
                        insertAfter(replacedNode, items.children[i]);
                    }
                }
            }
        }
        else {
            for (let i = 0; i < items.children.length; i++) {
                for (let j = i; j < items.children.length; j++) {
                    if (+items.children[i].dataset.id > +items.children[j].dataset.id) {
                        replacedNode = items.replaceChild(items.children[j], items.children[i]);
                        insertAfter(replacedNode, items.children[i]);
                    }
                }
            }
        }
    }

    function insertAfter(elem, refElem) {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }
}

function header() {
    const body = document.querySelector('body');
    const header = document.querySelector('header');

    function headerFix() {
        if(this.pageYOffset > 0) {
            header.classList.add('header_fixed');
            body.style.paddingTop = header.offsetHeight + 'px';
        }
        else {
            header.classList.remove('header_fixed');
            body.style.paddingTop = '0';
        }
    }

    headerFix();

    window.addEventListener('scroll', () => {
        headerFix();
    })

    const burgerMenu = document.querySelector('.burger-menu');
    const burgerMenuContent = document.querySelector('.burger-menu__content');

    function burgerToggle() {
        document.querySelector('.burger-menu__icon').classList.toggle('burger-menu__icon_active');
        burgerMenu.classList.toggle('burger-menu_active');
        document.querySelector('.hider').classList.toggle('hider_active');

        if (burgerMenuContent.style.maxHeight == '') {
            burgerMenu.style.maxWidth = burgerMenuContent.offsetWidth + 48 + 'px';
            burgerMenuContent.style.maxHeight = burgerMenuContent.scrollHeight + 'px';
        }
        else {
            burgerMenu.style.maxWidth = '';
            burgerMenuContent.style.maxHeight = '';
        }
    }

    burgerMenu.addEventListener('click', () => {
        burgerToggle();

        function outsideClickListener(event) {
            if (!event.target.closest('.burger-menu') && burgerMenuContent.style.maxHeight != '') {
                burgerToggle();
                document.removeEventListener('click', outsideClickListener);
            }
        }

        document.addEventListener('click', outsideClickListener);
    })
}


window.addEventListener('load', () => {
    header();
    slider();
    filter();
})