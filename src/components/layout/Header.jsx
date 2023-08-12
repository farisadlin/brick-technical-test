import GithubIcon from '@/assets/github-icon.png'
import { MEDIA_QUERIES_DEVICE } from '@/constants'
import styled from "styled-components"

// HEADER
const StyledMainHeaderContainer = styled.header`
    width: 100%;
`

const StyledHeaderWrapper = styled.div`
    display: flex;
    @media ${MEDIA_QUERIES_DEVICE.MOBILE} {
        justify-content: center;
    }
`

const StyledHeaderIcon = styled.img`
    width: 75px;
    height: 75px;
`

const StyledHeaderInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledHeaderTitle = styled.span`
    font-weight: bold;
`

const Header = () => {
    return (
        <StyledMainHeaderContainer>
            <StyledHeaderWrapper>
                <StyledHeaderIcon src={GithubIcon} />
                <StyledHeaderInfoWrapper>
                    <StyledHeaderTitle>Github Searcher</StyledHeaderTitle>
                    <span>Search users or repositories below</span>
                </StyledHeaderInfoWrapper>
            </StyledHeaderWrapper>
        </StyledMainHeaderContainer>
    )
}

export default Header;
