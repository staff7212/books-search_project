
import loading from '../../resources/loading.gif';
import './spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner-block" role="status">
      <img src={loading} alt="loading" />
    </div>
  )
}

export default Spinner;