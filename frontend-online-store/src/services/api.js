export async function getCategories() {
    const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categorias = await request.json();
    return categorias;
  }
  
  export async function getProductsFromCategoryAndQuery(categoryId, query) {
    if (categoryId && !query) {
      const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
      const produtoPesquisado = await request.json();
      return produtoPesquisado;
    }
    if (query && !categoryId) {
      console.log('chamou query');
      const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      const produtoPesquisado = await request.json();
      return produtoPesquisado;
    }
    if (categoryId && query) {
      console.log('chamou query e categoria');
      const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
      const produtoPesquisado = await request.json();
      return produtoPesquisado;
    }
  }
  