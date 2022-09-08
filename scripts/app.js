const products = {
  crazy: {
    name: 'Crazy',
    price: 31000,
    amount: 0,
    img: './assets/images/burger-1.png',
    get totalSumm() {
      return this.price * this.amount;
    },
  },

  light: {
    name: 'Light',
    price: 26000,
    amount: 0,
    img: 'assets/images/burger-2.png',
    get totalSumm() {
      return this.price * this.amount;
    },
  },

  cheeseburger: {
    name: 'CheeseBurger',
    price: 29000,
    amount: 0,
    img: 'assets/images/burger-3.png',
    get totalSumm() {
      return this.price * this.amount;
    },
  },

  dburger: {
    name: 'dBurger',
    price: 24000,
    amount: 0,
    img: 'assets/images/burger-4.png',
    get totalSumm() {
      return this.price * this.amount;
    },
  },
};

const productsBtn = document.querySelectorAll('.wrapper__menu-basketBtn'),
  basketBtn = document.querySelector('.wrapper__top-basketBtn'),
  basketBtnCount = basketBtn.querySelector('.wrapper__top-basketInd'),
  basketModal = document.querySelector('.basket'),
  basketModalClose = basketModal.querySelector('.basket__top-close'),
  basketModalChecklist = basketModal.querySelector('.basket__checklist'),
  basketModalTotalPrice = basketModal.querySelector('.basket__bottom-price');

productsBtn.forEach((btn) => {
  btn.addEventListener('click', function () {
    const parent = this.closest('.wrapper__menu-product'),
      parentId = parent.getAttribute('id');

    products[parentId].amount++;
    basket();
  });
});

function basket() {
  const productsArr = [];
  let count = 0;

  for (const key in products) {
    const po = products[key];
    let parent = document.getElementById(key),
      parentIndecators = parent.querySelector('.wrapper__menu-indecators');

    if (po.amount) {
      parentIndecators.innerHTML = po.amount;
      parentIndecators.classList.add('active');
      productsArr.push(po);
      count += po.amount;
    } else {
      parentIndecators.classList.remove('active');
    }

    if (count) {
      basketBtnCount.innerHTML = count;
      basketBtnCount.classList.add('active');
    } else {
      basketBtnCount.classList.remove('active');
    }
  }
  basketModalChecklist.innerHTML = ""
  for (let i = 0; i < productsArr.length; i++) {
    basketModalChecklist.innerHTML += addProductItem(productsArr[i]);
  }

  basketModalTotalPrice.innerHTML = totalPrice()
}

function addProductItem(el) {
  let {name, price, amount, img, totalSumm: summ} = el
  return `
  <div class="basket__product">
    <div class="basket__product-info">
      <img src="${img}" alt="">
      <div class="basket__product-block">
        <h3 class="basket__product-name">${name}</h3>
        <p class='basket__product-price'><span>${summ.toLocaleString()}</span> сум</p>
      </div>
    </div>
    <div class="basket__product-counter" id="${name.toLowerCase()}__card">
      <button class="basket__product-btn" data-symbol="-">-</button>
      <output class="basket__product-output">${amount}</output>
      <button class="basket__product-btn" data-symbol="+">+</button>
    </div>
  </div>
  `;
}

function totalPrice() {
  let result = 0;
  for (const key in products) {
    result += products[key].totalSumm
  }
  return result.toLocaleString()
}

window.addEventListener('click', function(e) {
  const elem = e.target
  if(elem.classList.contains("basket__product-btn")) {
    const parent = elem.closest('.basket__product-counter'),
          parentId = parent.getAttribute('id').split('_')[0],
          symbol = elem.getAttribute("data-symbol")
    if(symbol == '+') {
      products[parentId].amount++
    }else if(symbol == '-' && products[parentId].amount > 0) {
      products[parentId].amount--
    }
    basket()
  }
})





// 0 - false
// 1 - true

basketBtn.addEventListener('click', function () {
  basketModal.classList.add('active');
});
basketModalClose.onclick = () => basketModal.classList.remove('active');
