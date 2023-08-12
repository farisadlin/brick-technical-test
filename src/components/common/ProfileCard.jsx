import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;

const StyledAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledInfo = styled.div`
  flex: 1;
`;

const StyledName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const StyledLink = styled.a`
    cursor: pointer;
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledStats = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

export default function ProfileCard({ item }) {
    return (
        <StyledCard>
            <StyledAvatar src={item?.avatar_url} alt={item?.login} />
            <StyledInfo>
                <StyledName><StyledLink href={item?.html_url} target="_blank">{item?.login}</StyledLink></StyledName>
                <StyledStats>Github URL: {item?.html_url}</StyledStats>
            </StyledInfo>
        </StyledCard>
    );
}

ProfileCard.propTypes = {
    item: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        followers: PropTypes.string.isRequired,
        followers_url: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
    }).isRequired
}