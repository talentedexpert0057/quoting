import React from 'react'
import ModalItem from './modalItem'
import QuoteAddItemForm from './quoteAddItemForm'
import { updateQuote } from '../actions'

class MovieCreateForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      hasInitialDataLoaded: false,
      hasInitialTypesLoaded: false,
      allTypes: {},
      form: {
        address: '',
        city: '',
        status: '',
        addressType: '',
        requestType: '',
        category: '',
        referencetotal: '',
        currency: '',
        endDate: '',
        items: []
      }
    }
  }

  componentDidUpdate() {

    if (!this.state.hasInitialDataLoaded && this.props.initialData) {
      this.setState({
        form: this.props.initialData,
        hasInitialDataLoaded: true
      })
    }

    if (!this.state.hasInitialTypesLoaded && this.props.allTypesData) {
      this.setState({
        allTypes: this.props.allTypesData,
        hasInitialTypesLoaded: true
      })
    }
  }

  handleChange = (event) => {

    const target = event.target
    const name = target.name
    this.setState({
      form: {
        ...this.state.form,
        [name]: target.value
      },
      allTypes: { ...this.state.allTypes }
    })
  }

  handleAddItem = (quote) => {
    updateQuote(quote).then(() => {
      modal.closeModal()
      router.push('/')
    })
  }

  handleOptionChange = (event) => {
    const { options, id } = event.target
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({
      form: {
        ...this.state.form,
        [id]: value.toString()
      },
      allTypes: { ...this.state.allTypes }
    })
  }

  submitForm = () => {
    this.props.handleFormSubmit(this.state.form, () => {
      this.setState({
        allTypes: {},
        form: {
          address: '',
          city: '',
          status: '',
          addressType: '',
          requestType: '',
          category: '',
          referencetotal: '',
          currency: '',
          endDate: '',
          items: []
        }
      })
    })
  }

  render() {

    let modal = null

    const { form, allTypes } = this.state

    let optionTemplate = {}

    if (Object.keys(allTypes).length !== 0) {
      Object.keys(allTypes).forEach(function (key) {
        optionTemplate[key] = allTypes[key].map(function (v) {
          return <option key={v.id} value={v.id}>{v.name}</option>
        });
      });
    } else {
      optionTemplate = <option key="0" value="default">No hay opciones</option>
    }

    //TODO: calculate referente total
    //TODO: add date picker
    //TODO: add google maps address picker

    return (
      <form>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            value={form.address}
            onChange={this.handleChange}
            name="address"
            type="text"
            className="form-control" id="address" placeholder="Nombre y número de la calle" />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            value={form.city}
            onChange={this.handleChange}
            name="city"
            type="text"
            className="form-control" id="city" placeholder="CABA" />
        </div>
        <div className="form-group">
          <label htmlFor="addressType">Tipo de dirección</label>
          <select className="form-control" id="addressType" value={form.addressType.id} onChange={this.handleOptionChange}>
            {optionTemplate.addressType || optionTemplate}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="requestType">Tipo de cotización</label>
          <select className="form-control" id="requestType" value={form.requestType.id} onChange={this.handleOptionChange}>
            {optionTemplate.requestType || optionTemplate}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select className="form-control" id="category" value={form.category.id} onChange={this.handleOptionChange}>
            {optionTemplate.category || optionTemplate}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="referencetotal">Total de referencia</label>
          <input
            value={form.referencetotal}
            onChange={this.handleChange}
            name="referencetotal"
            type="text"
            className="form-control" id="referencetotal" placeholder="$$$" />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Moneda</label>
          <select className="form-control" id="currency" value={form.currency.id} onChange={this.handleOptionChange}>
            {optionTemplate.currency || optionTemplate}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha de vencimiento</label>
          <input
            value={form.endDate}
            onChange={this.handleChange}
            name="endDate"
            type="text"
            className="form-control" id="endDate" placeholder="AAAA-MM-DD" />
        </div>
        <div>
          <div>
            <button onClick={this.submitForm} type="button" className="btn btn-primary mr-2">Guardar cambios</button>
            <button type="button" className="btn btn-warning mr-2" data-toggle="modal" data-target="#itemModal">Modificar materiales</button>
            <ModalItem ref={ele => modal = ele} hasSubmit={false}>
              <QuoteAddItemForm
                handleFormSubmit={this.handleAddItem}
                allItems={form.items}
              />
            </ModalItem>
          </div>
        </div>
      </form>
    )
  }
}

export default MovieCreateForm

