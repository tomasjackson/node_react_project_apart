import { connect } from 'react-redux'
import { show as showModal, hide as hideModal } from 'redux-modal'
import Login from '../../components/Modals/Login'
import { login, onChange, register, facebookLogin } from '../../actions/auth-actions'

const mapDispatchToProps = {
  login,
  facebookLogin,
  onChange,
  register,
  showModal,
  hideModal
}
const mapStateToProps = state => ({
  error: state.auth.messages
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
