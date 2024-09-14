import EmptyHeader from '../base-components/emptyHeader';
import PropTypes from 'prop-types';

function PreLogin({ children }) {
    return(
        <>
            <EmptyHeader />
            <main>{children}</main>
        </>
    )
}

PreLogin.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PreLogin;