import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Carrinho from './pages/Carrinho';
import DetalhesProduto from './pages/DetalhesProduto';
import Home from './pages/Home';
import FinalizarCompra from './pages/FinalizarCompra';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      homeInput: '',
      produtoPesquisado: [],
      categoryId: '',
      produtosNoCarrinho: [],
      emptyIdAndQuery: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const categorias = await getCategories();
    const storage = JSON.parse(localStorage.getItem('produtosCarrinho'));
    this.setState({ categorias });
    if (storage) {
      this.setState({ produtosNoCarrinho: storage });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  buttonClick = async ({ target }) => {
    const { homeInput } = this.state;
    if (target.id) this.setState({ categoryId: target.id });
    if (!target.id && !homeInput) return this.setState({ emptyIdAndQuery: true });
    this.setState({ loading: true }, async () => {
      const { categoryId } = this.state;
      const searchProduct = await getProductsFromCategoryAndQuery(categoryId, homeInput);
      this.setState(
        { produtoPesquisado: searchProduct.results,
          emptyIdAndQuery: false,
          homeInput: '',
          loading: false,
        },
      );
    });
    /* const id = !target.id ? categoryId : target.id;
    this.setState({ categoryId: id }, async () => {
      console.log(id);
      const searchProduct = await getProductsFromCategoryAndQuery(id, homeInput);
      console.log(searchProduct);
      this.setState({
        produtoPesquisado: searchProduct.results,
      });
    }); */
  }

  adicionaAoCarrinho = ({ target }) => {
    const { id } = target;
    const { produtoPesquisado } = this.state;
    const produtoParaCarrinho = produtoPesquisado.find((item) => item.id === id);
    this.setState((prev) => ({
      produtosNoCarrinho: [...prev.produtosNoCarrinho, produtoParaCarrinho],
    }));

    if (JSON.parse(localStorage.getItem('produtosCarrinho'))) {
      const storage = JSON.parse(localStorage.getItem('produtosCarrinho'));
      localStorage.setItem('produtosCarrinho', JSON.stringify([...storage, produtoParaCarrinho]));
    } else {
      localStorage.setItem('produtosCarrinho', JSON.stringify([produtoParaCarrinho]));
    }
  }

  aumentaProduto = ({ target }) => {
    const { id } = target;
    const { produtosNoCarrinho } = this.state;
    const produtoParaCarrinho = produtosNoCarrinho.find((item) => item.id === id);
    this.setState((prev) => ({
      produtosNoCarrinho: [...prev.produtosNoCarrinho, produtoParaCarrinho],
    }));

    const storage = JSON.parse(localStorage.getItem('produtosCarrinho'));
    localStorage.setItem('produtosCarrinho', JSON.stringify([...storage, produtoParaCarrinho]));
  }

  diminuiProduto = ({ target }) => {
    const { id } = target;
    const { produtosNoCarrinho } = this.state;
    const produtoParaCarrinho = produtosNoCarrinho.find((item) => item.id === id);
    const indice = produtosNoCarrinho.indexOf(produtoParaCarrinho);
    produtosNoCarrinho.splice(indice, 1);
    this.setState({ produtosNoCarrinho });

    const storage = JSON.parse(localStorage.getItem('produtosCarrinho'));
    storage.splice(indice, 1);
    localStorage.setItem('produtosCarrinho', JSON.stringify(storage));
  }

  excluiProdutos = () => {
    this.setState({
      produtosNoCarrinho: [],
    });

    if (JSON.parse(localStorage.getItem('produtosCarrinho'))) {
      localStorage.setItem('produtosCarrinho', JSON.stringify([]));
    }
  }

  /* verifyButton = () => {
    console.log(this.props);
    const values = Object.values(this.state.finalizarCompra);
    const verifyEmpty = values.some((i) => i === '' || i === 'Estado');
    let { finalizarCompra } = this.state;
    if (verifyEmpty === false) {
      finalizarCompra = {
        inputName: '',
        inputEmail: '',
        inputCPF: '',
        inputTel: '',
        inputCEP: '',
        inputAdress: '',
        inputComp: '',
        inputNum: '',
        inputCity: '',
        estado: 'Estado',
        pay: '',
      };
      this.setState({ finalizarCompra, produtosNoCarrinho: [] });

    }
  } */

  /* finalizarCompraChange = ({ target }) => {
    const { name, value } = target;
    const { finalizarCompra } = this.state;
    finalizarCompra[name] = value;
    this.setState({ finalizarCompra });
  } */
  resetProdutosCarrinho = () => {
    this.setState({ produtosNoCarrinho: [] });
  }

  render() {
    const {
      categorias,
      homeInput,
      produtoPesquisado, produtosNoCarrinho, emptyIdAndQuery, loading } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (<Home
            { ...props }
            categorias={ categorias }
            homeInput={ homeInput }
            handleChange={ this.handleChange }
            buttonClick={ this.buttonClick }
            itemPesquisado={ produtoPesquisado }
            adicionaAoCarrinho={ this.adicionaAoCarrinho }
            produtosNoCarrinho={ produtosNoCarrinho }
            emptyIdAndQuery={ emptyIdAndQuery }
            loading={ loading }
          />) }
        />
        <Route
          path="/carrinho"
          render={ (props) => (<Carrinho
            { ...props }
            produtosNoCarrinho={ produtosNoCarrinho }
            aumentaProduto={ this.aumentaProduto }
            diminuiProduto={ this.diminuiProduto }
            excluiProdutos={ this.excluiProdutos }
          />) }
        />
        <Route
          path="/detalhes/:id"
          render={ (props) => (<DetalhesProduto
            { ...props }
            itemPesquisado={ produtoPesquisado }
            adicionaAoCarrinho={ this.adicionaAoCarrinho }
            produtosNoCarrinho={ produtosNoCarrinho }
          />) }
        />
        <Route
          path="/finalizar-compra"
          render={ (props) => (<FinalizarCompra
            { ...props }
            verifyButton={ this.verifyButton }
            finalizarCompraChange={ this.finalizarCompraChange }
            produtosNoCarrinho={ produtosNoCarrinho }
            { ...this.state }
            resetProdutosCarrinho={ this.resetProdutosCarrinho }
          />) }
        />
        {/* <Route path="/compra-finalizada" component={ CompraFinalizada } /> */}
      </Switch>
    );
  }
}
