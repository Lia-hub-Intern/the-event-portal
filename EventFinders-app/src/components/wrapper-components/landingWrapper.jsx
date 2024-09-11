import LandingHeader from '../base-components/landingHeader.jsx';
import PropTypes from 'prop-types';

function LandingPage({ children }) {
    return(
        <>
            <LandingHeader />
            <main>{children}</main>
        </>
    )
}

LandingPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LandingPage;