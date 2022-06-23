
import errorImg from '../../resources/error.png';
import './error.scss';

const Error = () => {
  return (
    <div className="error-block" role="status">
      <img src={errorImg} alt="error" />
      <div className="error-block__title">Ooops.... error</div>
    </div>
  )
}

export default Error;