const ColA = ['A1-orange', 'A2-gold', 'A3-gold', 'A4-blue', 'A5-gold', 'A6-gold', 'A7-gold', 'A8-gold', 'A9-gold', 'A10-gold', 'A11-blue', 'A13-red', 'A14-black'];
const ColB = ['B1-blue', 'B2-gray', 'B3-green', 'B4-purple', 'B5-purple', 'B6-green', 'B7-blue', 'B8-blue', 'B9-blue', 'B10-gray', 'B11-green', 'B13-purple', 'B14-purple', 'B15-red', 'B16-black'];
const ColC = ['A1-orange', 'A2-gold', 'A3-gold', 'A4-blue', 'A5-gold', 'A6-gold', 'A7-gold', 'A8-gold', 'A9-gold', 'A10-gold', 'A11-blue', 'A13-red', 'A14-black'];
const ColD = ['B1-blue', 'B2-gray', 'B3-green', 'B4-purple', 'B5-purple', 'B6-green', 'B7-blue', 'B8-blue', 'B9-blue', 'B10-gray', 'B11-green', 'B13-purple', 'B14-purple', 'B15-red', 'B16-black'];

const  priceC = 70;



const apartmentsData = [
  {
    category: 'gold',
    dimensions: [
      { width: 2.5, length: 5 },
      { width: 3.5, length: 2.5 },
    ],
  },
  {
    category: 'blue',
    dimensions: [
      { width: 3, length: 2.5 },
    ],
  },
  {
    category: 'green',
    dimensions: [
      { width: 2.5, length: 3 },
      { width: 3, length: 2.5 },
      { width: 2.2, length: 1.10 },
    ],
  },
  {
    category: 'purple',
    dimensions: [
      { width: 5, length: 2.5 },
    ],
  },
  {
    category: 'gray',
    dimensions: [
      { width: 3, length: 2.5 },
      { width: 5, length: 2.5 },
    ],
  },
  {
    category: 'red',
    dimensions: [
      { width: 4, length: 2.5 },
      { width: 4, length: 2.5 },
    ],
  },
  {
    category: 'orange',
    dimensions: [
      { width: 3, length: 5 },
      { width: 3.5, length: 2.5 },
    ],
  },
  {
    category: 'black',
    dimensions: [
      { width: 3, length: 5 },
      { width: 3.5, length: 2.5 },
    ],
  },

];


const columnA = document.getElementById('columnA');
const columnB = document.getElementById('columnB');
const columnC = document.getElementById('columnC');
const columnD = document.getElementById('columnD');
let selectedApartments = [];

function createApartmentElement(apartmentCode) {
  const Qaws = 'Qaws';
  const category = apartmentCode.split('-')[1];
  const dimensions = apartmentCode.split('-')[0];
  const apartmentElement = document.createElement('div');
  apartmentElement.className = `apartment color-${category}`;
  apartmentElement.innerText = apartmentCode;
  const boxElement = document.createElement('div');
  boxElement.className = 'box';

  const apartmentData = apartmentsData.find((data) => data.category.toLowerCase() === category.toLowerCase());
  if (apartmentData) {
    apartmentData.dimensions.forEach((dimension) => {
      const spanElement = document.createElement('span');
      spanElement.innerText = `Width: ${dimension.width}, Length: ${dimension.length}`;
      boxElement.appendChild(spanElement);
      boxElement.appendChild(document.createElement('br'));
    });

    if (!apartmentElement.classList.contains('color-blue') && !apartmentElement.classList.contains('color-purple') && !apartmentElement.classList.contains('color-black')) {
      const Qawss = document.createElement('span');
      Qawss.innerText = Qaws;
      boxElement.appendChild(Qawss);
    }
  } else {
    boxElement.innerText = dimensions;
  }

  apartmentElement.appendChild(boxElement);
  apartmentElement.addEventListener('click', () => {
    if (apartmentElement.classList.contains('selected')) {
      apartmentElement.classList.remove('selected');
      const index = selectedApartments.indexOf(apartmentElement);
      if (index !== -1) {
        selectedApartments.splice(index, 1);
      }
    } else {
      apartmentElement.classList.add('selected');
      selectedApartments.push(apartmentElement);
    }
  });

  return apartmentElement;
}






ColA.forEach((apartmentCode) => {
  const apartmentElement = createApartmentElement(apartmentCode);
  columnA.appendChild(apartmentElement);
});

ColB.forEach((apartmentCode) => {
  const apartmentElement = createApartmentElement(apartmentCode);
  columnB.appendChild(apartmentElement);
});


ColC.forEach((apartmentCode) => {
  const apartmentElement = createApartmentElement(apartmentCode);
  // columnC.appendChild(apartmentElement);
});

ColD.forEach((apartmentCode) => {
  const apartmentElement = createApartmentElement(apartmentCode);
  // columnD.appendChild(apartmentElement);
});


const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', () => {
  let totalArea = 0;
  let totalPrice = 0;
  let cost = 39 * priceC;
  console.log(cost)
  const colorCounts = {
    gold: 0,
    blue: 0,
    green: 0,
    purple: 0,
    gray: 0,
    red:0,
    orange:0,
    black:0,
  };

  ColA.forEach((item) => {
    const color = item.split('-')[1];
    colorCounts[color]++;
  });

  ColB.forEach((item) => {
    const color = item.split('-')[1];
    colorCounts[color]++;
  });

  Object.entries(colorCounts).forEach(([color, count]) => {
    const apartmentData = apartmentsData.find((data) => data.category === color);
    if (apartmentData) {
      const areaPerApartment = apartmentData.dimensions.reduce(
        (acc, dimension) => acc + dimension.width * dimension.length,
        0
      );
      const totalAreaPerColor = areaPerApartment * count;
      totalArea += totalAreaPerColor;
    }
  });


  totalPrice = totalArea * priceC;
  console.log('Total Price before : ',totalPrice)
  totalPrice = totalPrice + cost
  console.log('Total Price after : ',totalPrice)

  alert(`Total Area: ${totalArea} square meters\nTotal Price: ${totalArea}m  *  ${priceC} + Cost = 39m * 70 = ${cost} = ${totalPrice}dh`);

});




//
const totalWorkerButton = document.getElementById('totalW');
totalWorkerButton.addEventListener('click', () => {
  let selectedApartments = document.querySelectorAll('.apartment.selected');
  let totalArea = 0;
  let totalPrice = 0;

  selectedApartments.forEach((apartment) => {
    const category = apartment.className.split(' ').find((className) => className.includes('color-')).split('-')[1];
    const apartmentData = apartmentsData.find((data) => data.category === category);
    if (apartmentData) {
      apartmentData.dimensions.forEach((dimension) => {
        totalArea += dimension.width * dimension.length;
      });
    }
  });

  totalPrice = totalArea * priceC;

  const formattedTotalArea = totalArea.toLocaleString();
  const formattedTotalPrice = totalPrice.toLocaleString();

  if (totalArea !== 0 && totalPrice !== 0) {
    alert(`Total Area: ${formattedTotalArea} square meters\nTotal Price: ${formattedTotalArea}m * ${priceC} = ${formattedTotalPrice}dh`);
  } else {
    alert('Please select the apartment you want to count');
  }
});



const selectAllButton = document.getElementById('selectAll');
selectAllButton.addEventListener('click', () => {
  const allApartments = document.querySelectorAll('.apartment');
  const isSelected = selectAllButton.classList.toggle('selected-all');

  allApartments.forEach((apartment) => {
    if (isSelected) {
      apartment.classList.add('selected');
      selectedApartments.push(apartment);
    } else {
      apartment.classList.remove('selected');
      selectedApartments = [];
    }
  });
});


const moneyITake = [200, 2000, 3000, 1000, 9000];
const totalMoney = moneyITake.reduce((acc, value) => acc + value, 0);

const showMoneyCount = document.getElementById('show_money_count');
const totalMoneyContainer = document.getElementById('totalMoneyContainer');

showMoneyCount.addEventListener('click', () => {
  totalMoneyContainer.classList.toggle('hide');
  
  if (totalMoneyContainer.classList.contains('hide')) {
    totalMoneyContainer.innerHTML = '';
  } else {
    totalMoneyContainer.innerHTML = '';

    // Create a new paragraph element for each array item
    moneyITake.forEach((money) => {
      const moneyElement = document.createElement('p');
      moneyElement.textContent = money;
      totalMoneyContainer.appendChild(moneyElement);
    });

    // const  priceW = 35;
// const Qaws = 20;
// const QawSW = 100;
// const QawSC = 250;

    // Create a new paragraph element for the total
    const totalMoneyElement = document.createElement('p');
    totalMoneyElement.textContent = `Total: ${totalMoney} DH`;
    totalMoneyContainer.appendChild(totalMoneyElement);
  }
});


const week_1 = {
  props: {
    name: 'unknown',
    startAt: new Date('june 6, 2023')
  },
  Monday: { blacka: 40 },
  Tuesday: { blacka: 42 },
  Wednesday: { blacka: 40 },
  Thursday: { blacka: 60 },
  Friday: { blacka: 28 },
  Saturday: { blacka: 0 },
  Sunday: null
};

const week1 = {
  props: {
    name: 'Aziz',
    startAt: new Date('june 5, 2023')
  },
  Monday: { jwan: 47, blacka: 0 },
  Tuesday: { jwan: 40, blacka: 30 },
  Wednesday: { jwan: 46, blacka: 48 },
  Thursday: { jwan: 46, blacka: 46 },
  Friday: { jwan: 46, blacka: 32 },
  Saturday: { jwan: 34, blacka: 34 },
  Sunday: null
};

const week2 = {
  props: {
    name: 'Aziz',
    startAt: new Date('May 12, 2023')
  },
  Monday: { jwan: 20, blacka: 40 },
  Tuesday: { jwan: 40, blacka: 40 },
  Wednesday: { jwan: 40, blacka: 40 },
  Thursday: { jwan: 40, blacka: 40 },
  Friday: { jwan: 44, blacka: 40 },
  Saturday: { jwan: 0, blacka: 0 },
  Sunday: null
};

const getStafCountBtn = document.getElementById('get staf_Count');
const stafContainer = document.querySelector('.staf-container');

getStafCountBtn.addEventListener('click', () => {
  if (stafContainer.classList.contains('hide')) {
    stafContainer.classList.remove('hide');
    stafContainer.classList.add('show');
  } else {
    stafContainer.classList.remove('show');
    stafContainer.classList.add('hide');
  }

  const weeks = [week_1, week1, week2];

  const totalJwan = weeks.reduce((sum, week) => {
    const jwanCount = Object.values(week)
      .filter((day) => day && day.jwan)
      .reduce((total, day) => {
        if (week.props.name === 'Aziz') {
          return total + (day.jwan * 4.5);
        } else {
          return total + day.jwan;
        }
      }, 0);
    return sum + jwanCount;
  }, 0);
  
  const totalBlacka = weeks.reduce((sum, week) => {
    const blackaCount = Object.values(week)
      .filter((day) => day && day.blacka)
      .reduce((total, day) => {
        if (week.props.name === 'Aziz') {
          return total + (day.blacka * 2.5);
        } else {
          return total + day.blacka;
        }
      }, 0);
    return sum + blackaCount;
  }, 0);
  



  const totalJwanValue = totalJwan * 4.5;
  const totalBlackaValue = totalBlacka * 2.5;
  console.log('Total Jwan:', totalJwan);
  console.log('Total Blacka:', totalBlacka);

  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');
  const li4 = document.createElement('li');
  const li5 = document.createElement('li');
  const li6 = document.createElement('li');
  const strong1 = document.createElement('strong');
  const strong2 = document.createElement('strong');
  const strong3 = document.createElement('strong');

  h2.textContent = `name: ${week2.props.name} `;
  p.textContent = `Start At: ${week2.props.startAt.toLocaleDateString('ar-En', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
  li1.textContent = `Monday: jwan=${week2.Monday.jwan}, blacka=${week2.Monday.blacka}`;
  li2.textContent = `Tuesday: jwan=${week2.Tuesday.jwan}, blacka=${week2.Tuesday.blacka}`;
  li3.textContent = `Wednesday: jwan=${week2.Wednesday.jwan}, blacka=${week2.Wednesday.blacka}`;
  li4.textContent = `Thursday: jwan=${week2.Thursday.jwan}, blacka=${week2.Thursday.blacka}`;
  li5.textContent = `Friday: jwan=${week2.Friday.jwan}, blacka=${week2.Friday.blacka}`;
  li6.textContent = `Saturday: jwan=${week2.Saturday.jwan}, blacka=${week2.Saturday.blacka}`;
  strong1.textContent = `strong1: = ${totalBlacka} strong2: ${totalJwan}`
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  ul.appendChild(li5);
  ul.appendChild(li6);

  stafContainer.innerHTML = '';
  stafContainer.appendChild(h2)
  stafContainer.appendChild(p);
  stafContainer.appendChild(ul);
  stafContainer.appendChild(strong1)
  stafContainer.appendChild(strong2)
  stafContainer.appendChild(strong3)
});

function changeGradient() {
  const coulwareElement = document.querySelector(".coulware");

  function updateGradient() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const deg = scrollTop / 10;
      coulwareElement.style.background = `repeating-linear-gradient(${deg}deg, black, transparent 100px)`;
  }

  window.addEventListener("scroll", updateGradient);
}

changeGradient();