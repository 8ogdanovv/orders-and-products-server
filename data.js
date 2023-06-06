export const orders = [
  {
    id: 1,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-06-29 12:09:33',
    group: 'Длинное предлинное длиннючее название группьі',
    owner: null,
    products: {
      id: 1,
      quntity: 2,
      isNew: 1,
      guarantee: {
        start: '2017-06-29 12:09:33',
        end: '2017-06-29 12:09:33',
      },
      price: [
        {value: 200, symbol: 'USD', isDefault: 0},
        {value: 5200, symbol: 'UAH', isDefault: 1},
      ]
    },
  },
  {
    id: 2,
    title: 'Длинное название прихода',
    date: '2017-06-29 12:09:33',
    group: 'Длинное предлинное длиннючее название группьі',
    owner: null,
    products: {
      id: 1,
      quntity: 2,
      isNew: 0,
      guarantee: {
        start: '2017-06-29 12:09:33',
        end: '2017-06-29 12:09:33',
      },
      price: [
        {value: 2, symbol: 'USD', isDefault: 0},
        {value: 50, symbol: 'UAH', isDefault: 1},
      ]
    },
  },
  {
    id: 3,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-06-29 12:09:33',
    group: null,
    owner: 'Христорождественский Александр',
    products: {
      id: 1,
      quntity: 2,
      isNew: 1,
      guarantee: {
        start: '2017-06-29 12:09:33',
        end: '2017-06-29 12:09:33',
      },
      price: [
        {value: 100, symbol: 'USD', isDefault: 0},
        {value: 2600, symbol: 'UAH', isDefault: 1},
      ]
    },
  },
  {
    id: 4,
    title: 'Длинное предлинное название прихода',
    date: '2017-06-29 12:09:33',
    group: 'Длинное предлинное длиннючее название группьі',
    owner: null,
    products: {
      id: 1,
      quntity: 1,
      isNew: 0,
      guarantee: {
        start: '2017-06-29 12:09:33',
        end: '2017-06-29 12:09:33',
      },
      price: [
        {value: 2, symbol: 'USD', isDefault: 0},
        {value: 50, symbol: 'UAH', isDefault: 1},
      ]
    },
  },
]

export const products = [
  {
    id: 1,
    serialNumber: 1234,
    photo: 'https://static.bhphoto.com/images/multiple_images/images500x500/1657721733_IMG_1794925.jpg',
    title: 'Gigabyte M27F A 27" 165 Hz KVM Gaming Monitor',
    type: 'Monitors',
    specification: 'Specification 1',
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1},
    ]
  }
]
