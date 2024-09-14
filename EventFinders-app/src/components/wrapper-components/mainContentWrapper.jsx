import FullHeader from '../base-components/fullHeader';
import PropTypes from 'prop-types';

function MainContent({ children }) {
    return(
        <>
            <FullHeader />
            <main>{children}</main>
        </>
    )
}

MainContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContent;