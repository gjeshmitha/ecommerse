module.exports = (req, res) => {
  const products = [
    { id: "prod_1", name: "Phone", price: 599.99 },
    { id: "prod_2", name: "Laptop", price: 999.99 },
    { id: "prod_3", name: "Headphones", price: 199.99 }
  ];
  
  res.status(200).json(products);
};
