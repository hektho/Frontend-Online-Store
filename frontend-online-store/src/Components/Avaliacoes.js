import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Avaliacoes.css';

export default class Avaliacoes extends Component {
  /* avaliarBtnClick = () => {
    const { emailInput, textArea, nota, idDoProduto } = this.props;
    const objComentarios = {
      emailInput,
      textArea,
      nota,
      idDoProduto,
    };
    const storageComentario = JSON.parse(localStorage.getItem('comentarios'));
    const verify = !storageComentario ? [] : storageComentario;
    const storageComentarioAtt = [...verify, objComentarios];
    localStorage.setItem('comentarios', JSON.stringify(storageComentarioAtt));
    /* if (!JSON.parse(localStorage.getItem('comentarios'))) {
      localStorage.setItem('comentarios', JSON.stringify([objComentarios]));
    } else {
      const storageComentario = JSON.parse(localStorage.getItem('comentarios'));
      const storageComentarioAtt = [...storageComentario, objComentarios];
      localStorage.setItem('comentarios', JSON.stringify(storageComentarioAtt));
    }
  } */

  render() {
    const TEN = 10;
    const { emailInput,
      emailInputChange,
      radioInputChange,
      avaliarBtnClick,
      inputRadio1,
      inputRadio2,
      inputRadio3,
      inputRadio4,
      inputRadio5,
      idDoProduto,
      textArea } = this.props;
    const comentarios = JSON.parse(localStorage.getItem('comentarios'));
    const verify = !comentarios ? [] : comentarios;
    const comentariosFiltred = verify.filter((item) => item.idDoProduto === idDoProduto);
    return (
      <section className="avaliation-maincontainer">
        <form className="form-container">
          <h2 className="avaliation-title"> Avaliações </h2>
          <input
            type="text"
            placeholder="E-mail"
            name="emailInput"
            value={ emailInput }
            onChange={ emailInputChange }
            data-testid="product-detail-email"
          />
          <section className="rating">
            <span> Nota:</span>
            <label htmlFor="1">
              {' '}
              1
              <input
                checked={ inputRadio1 }
                type="radio"
                name="inputRadio1"
                id="1"
                onClick={ radioInputChange }
                data-testid="1-rating"

              />
            </label>
            <label htmlFor="2">
              {' '}
              2
              <input
                checked={ inputRadio2 }
                type="radio"
                name="inputRadio2"
                id="2"
                onClick={ radioInputChange }
                data-testid="2-rating"
              />
            </label>
            <label htmlFor="3">
              {' '}
              3
              <input
                checked={ inputRadio3 }
                type="radio"
                name="inputRadio3"
                id="3"
                onClick={ radioInputChange }
                data-testid="3-rating"
              />
            </label>
            <label htmlFor="4">
              {' '}
              4
              <input
                checked={ inputRadio4 }
                type="radio"
                name="inputRadio4"
                id="4"
                onClick={ radioInputChange }
                data-testid="4-rating"
              />
            </label>
            <label htmlFor="5">
              {' '}
              5
              <input
                checked={ inputRadio5 }
                type="radio"
                name="inputRadio5"
                id="5"
                onClick={ radioInputChange }
                data-testid="5-rating"
              />
            </label>
          </section>
          <textarea
            cols="40"
            rows="5"
            placeholder="Mensagem(opcional)"
            onChange={ emailInputChange }
            name="textArea"
            value={ textArea }
            data-testid="product-detail-evaluation"
          />
          <button
            type="button"
            onClick={ avaliarBtnClick }
            disabled={ !(emailInput.includes('@') && emailInput.length > TEN) }
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>
        </form>
        <h2> Comentários </h2>
        {comentariosFiltred.length === 0
          ? (
            <h2>
              Ainda não há nenhum comentário deste produto.
            </h2>
          )
          : (comentariosFiltred.map((item, index) => (
            <section className="comentarios" key={ index }>
              <h3>
                {' '}
                {item.emailInput}
                {' '}
              </h3>
              <h4>
                { `Nota: ${item.nota}/5` }
              </h4>
              <h4>
                { item.textArea}
              </h4>
            </section>
          )))}
      </section>
    );
  }
}

Avaliacoes.propTypes = {
  emailInput: PropTypes.string.isRequired,
  emailInputChange: PropTypes.func.isRequired,
  radioInputChange: PropTypes.func.isRequired,
  avaliarBtnClick: PropTypes.func.isRequired,
  inputRadio1: PropTypes.bool.isRequired,
  inputRadio2: PropTypes.bool.isRequired,
  inputRadio3: PropTypes.bool.isRequired,
  inputRadio4: PropTypes.bool.isRequired,
  inputRadio5: PropTypes.bool.isRequired,
  idDoProduto: PropTypes.string.isRequired,
  textArea: PropTypes.string.isRequired,
};
