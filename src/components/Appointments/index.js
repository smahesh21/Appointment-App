import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    initialName: '',
    initialDate: '',
    isFilteredWithStarred: false,
  }

  onChangeName = event => {
    this.setState({initialName: event.target.value})
  }

  onClickOnDate = event => {
    this.setState({initialDate: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {appointmentsList, initialName, initialDate} = this.state

    const updatedDate = initialDate
      ? format(new Date(initialDate), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      inputName: initialName,
      date: updatedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      initialName: '',
      initialDate: '',
    }))
  }

  onClickedOnStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilteredWithStarred} = this.state
    this.setState(prevState => ({
      isFilteredWithStarred: !prevState.isFilteredWithStarred,
    }))
  }

  render() {
    const {
      appointmentsList,
      initialDate,
      initialName,
      isFilteredWithStarred,
    } = this.state
    const starredStyling = isFilteredWithStarred
      ? 'filter-filled'
      : 'filter-empty'
    const searchResults = isFilteredWithStarred
      ? appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )
      : appointmentsList

    return (
      <div className="main-container">
        <div className="sub-container">
          <div className="form-container">
            <div className="form-styling">
              <h1 className="main-heading">Add Appointments</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="label-styling">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="title"
                  value={initialName}
                  onChange={this.onChangeName}
                />
                <br />
                <label htmlFor="date" className="label-styling">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  value={initialDate}
                  className="date"
                  placeholder="Date"
                  onChange={this.onClickOnDate}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-image"
              alt="appointments"
            />
          </div>
          <hr className="hr-styling" />
          <div className="bottom-container">
            <div className="appointment-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                onClick={this.onFilter}
                className={`starred-button ${starredStyling}`}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="appointment-card">
            {searchResults.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                onClickedOnStar={this.onClickedOnStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
