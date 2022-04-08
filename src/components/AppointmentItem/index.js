import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onClickedOnStar} = props
  const {inputName, date, isStarred, id} = eachAppointment

  const onClickLike = () => {
    onClickedOnStar(id)
  }

  const URL = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="heading-image-container">
        <p className="input-name">{inputName}</p>

        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickLike}
        >
          <img src={URL} className="star" alt="star" />
        </button>
      </div>
      <p className="date-styling">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
