import truncateText from '@/utils/truncateText';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    border: 1px solid #e1e4e8;
    padding: 20px;
    margin: 1em 0;
    border-radius: 5px;
`;

const StyledCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;

    a {
        color: #0366d6;
        text-decoration: none;
    }
`;

const StyledCardFooter = styled.div`
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    span {
        color: #586069;
        font-size: 0.9em;
    }
`;

const StyledDescription = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* ensures text doesn't wrap to next line */
  max-width: 90%; /* or whatever width you want */
`;


const RepositoryCard = ({ item }) => {
    console.log({item})
    return (
        <StyledCard>
            <StyledCardHeader>
                <a href={item?.html_url} target="_blank" rel="noopener noreferrer">{item?.name}</a>
                <span>by <a href={item?.owner?.html_url} target="_blank" rel="noopener noreferrer">{item?.owner?.login}</a></span>
            </StyledCardHeader>
            <StyledDescription>{truncateText(item?.description)}</StyledDescription>
            <StyledCardFooter>
                <span>Language: {item?.language}</span>
                <span>Stars: {item?.stargazers_count}</span>
                <span>Watchers: {item?.watchers_count}</span>
                <span>Issues: {item?.open_issues_count}</span>
                <span>License: {item?.license ? item?.license?.name : 'N/A'}</span>
                <div>
                    <span>Created: {new Date(item?.created_at).toLocaleDateString()}</span>
                    <span>Last Updated: {new Date(item?.updated_at).toLocaleDateString()}</span>
                </div>
            </StyledCardFooter>
        </StyledCard>
    );
};

RepositoryCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        description: PropTypes.string,
        owner: PropTypes.shape({
            login: PropTypes.string.isRequired,
            html_url: PropTypes.string.isRequired,
        }).isRequired,
        language: PropTypes.string,
        stargazers_count: PropTypes.number.isRequired,
        watchers_count: PropTypes.number.isRequired,
        open_issues_count: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        license: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default RepositoryCard;
