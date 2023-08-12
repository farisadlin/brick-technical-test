import { MEDIA_QUERIES_DEVICE } from '@/constants';
import { getLanguageColor } from '@/utils/getLanguageColor';
import truncateText from '@/utils/truncateText';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e1e4e8;
    padding: 20px;
    border-radius: 5px;

    @media ${MEDIA_QUERIES_DEVICE.MOBILE} {
        padding: 10px;
        width: 100%;
    }
`;

const StyledCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;

    a {
        color: #0366d6;
        text-decoration: none;
    }

    span {
        display: block;
    }

    @media ${MEDIA_QUERIES_DEVICE.MOBILE} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const StyledCardContent = styled.div`
    flex: 1; 
`;

const StyledCardFooter = styled.div`
    display: grid;
    flex-flow: column wrap;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    span {
        color: #586069;
        font-size: 0.9em;

        @media ${MEDIA_QUERIES_DEVICE.MOBILE} {
            font-size: 0.8em;
        }
    }
`;

const StyledDescription = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0;

    @media ${MEDIA_QUERIES_DEVICE.MOBILE} {
        font-size: 0.9em;
    }
`;

const StyledLanguageDot = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${props => getLanguageColor(props.language)};
`;

const RepositoryCard = ({ item }) => {
    return (
        <StyledCard>
            <StyledCardContent>
                <StyledCardHeader>
                    <a href={item?.html_url} target="_blank" rel="noopener noreferrer">{item?.name}</a>
                    <span>by <a href={item?.owner?.html_url} target="_blank" rel="noopener noreferrer">{item?.owner?.login}</a></span>
                </StyledCardHeader>
            </StyledCardContent>
            <StyledDescription>{item?.description ? truncateText(item?.description, 50) : '-'}</StyledDescription>
            <StyledCardFooter>
                <span>
                    <StyledLanguageDot language={item?.language} />
                    {item?.language || "-"}
                </span>
                <span>⭐ {item?.stargazers_count}</span>
                <span>👁️ {item?.watchers_count}</span>
                <span>License: {item?.license ? item?.license?.name : 'N/A'}</span>
                <span>Created At: {new Date(item?.created_at).toLocaleDateString()}</span>
                <span>Last Updated: {new Date(item?.updated_at).toLocaleDateString()}</span>
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
