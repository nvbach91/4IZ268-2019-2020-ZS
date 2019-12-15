import { connect } from 'react-redux';
import AppComponent from './AppComponent';

const mapStateToProps = (state) => ({
  videoDetail: state.videoSearch.videoDetail,
});

const AppContainer = connect(
  mapStateToProps,
  null,
)(AppComponent);

export default AppContainer;
