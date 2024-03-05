function cat(categoryId) {
  switch (categoryId) {
    case 1: 
      return 'income'
    case 2:
      return 'outcome'
    default:
      break;
  }
}

export {cat}