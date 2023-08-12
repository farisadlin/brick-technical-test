import { MEDIA_QUERIES_DEVICE } from '@/constants'
import PropTypes from 'prop-types';
import styled from "styled-components"
import Header from './Header'

const StyledMainLayout = styled.div`
    width: 100%;
    margin: 0 auto;

    @media ${MEDIA_QUERIES_DEVICE.DESKTOP} {
        max-width: 1800px;
    }
`;

const MainLayout = ({ children }) => {
    return (
        <StyledMainLayout>
            <Header />
            {children}
        </StyledMainLayout>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayout;