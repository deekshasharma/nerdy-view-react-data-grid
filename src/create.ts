import faker from "faker";

function createRow(index: number) {
  return {
    id: index,
    title: faker.commerce.productName(),
    variant: faker.commerce.product(),
    img: faker.image.nature(),
    // retailPrice: faker.commerce.price(),
    retailPrice: faker.commerce.price(),
    empPrice: faker.commerce.price(),
    size: faker.random.word(),
    stock: faker.datatype.number(),
    sku: faker.datatype.uuid(),
    vat: Math.floor(Math.random() * 10)
  };
}

export default function createRows(count: number) {
  return [...Array(count).keys()].map((i) => createRow(i));
}
