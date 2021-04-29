const filterByCriteria = (items, criteria, value) => {
  if (value === 'all') {
    return items;
  }

  if (criteria === 'price') {
    if (value === 0) {
      return items;
    }
    return items.filter((item) => item.price <= value);
  }

  if (criteria === 'model') {
    return items.filter((item) => item.model.includes(value));
  }

  return items.filter((item) => item[criteria] === value);
};

export default filterByCriteria;
