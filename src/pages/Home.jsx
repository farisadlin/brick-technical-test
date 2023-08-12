import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import ErrorPage from "@/components/common/ErrorPage";
import { fetchSearchGithubData } from "@/api/fetchSearchGithubData";
import { fetchSearchGithubDataFailed, fetchSearchGithubDataLoading, fetchSearchGithubDataSuccess } from "@/redux/actions/githubDataAction";
import { DROPDOWN_OPTIONS, MEDIA_QUERIES_DEVICE, PAGE_LIMIT } from "@/constants";
import capitalizeText from "@/utils/capitalizeText";
import SkeletonCard from "@/components/common/SkeletonCard";
import useDebounce from "@/hooks/useDebounce";
import NoDataFoundPage from '@/components/common/NoDataFoundPage';
import MainLayout from '@/components/layout/MainLayout';
import ProfileCard from './components/ProfileCard';
import RepositoryCard from './components/RepositoryCard';

// FILTERS
const StyledFilterContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`

const StyledSearchInput = styled.input`
    padding: 10px;
    width: 300px;
`

const StyledDropdownInput = styled.select`
    cursor: pointer;
    height: 39.5px;
    margin-left: 10px;
    padding: 10px;
    width: 120px;
    -webkit-appearance: none;
    appearance: none;
    background-color: #ffffff;
    background-position: right 10px center;
    background-repeat: no-repeat;
    border-radius: 3px;
`;

const StyledDropdownWrapper = styled.div`
    position: relative;
    display: inline-block;

    &::after {
        content: "▼";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        pointer-events: none;
    }
`;

// CARD
const StyledCardContainer = styled.div`
    display: grid;
    margin-top: 25px;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    background-color: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background */

    @media ${MEDIA_QUERIES_DEVICE.TABLET} {
        grid-template-columns: 1fr
    }
`

function renderSkeletonComponent() {
    const loopCount = 9;

    const divs = [];

    for (let i = 0; i < loopCount; i++) {
        divs.push(<SkeletonCard key={i}>Div {i + 1}</SkeletonCard>);
    }

    return divs;
}

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);

    const [selectedOption, setSelectedOption] = useState(DROPDOWN_OPTIONS.USERS);
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [isDataEmpty, setIsDataEmpty] = useState(false);
    const [inputSearchValue, setInputSearchValue] = useState('');

    const debounceInputValue = useDebounce(inputSearchValue, 300)
    const { data, loading, error } = useSelector(({ githubData }) => githubData);

    const totalPages = Math.ceil((data?.total_count || PAGE_LIMIT) / PAGE_LIMIT);

    const updateURLParameters = () => {
        const searchParams = new URLSearchParams();

        searchParams.set("q", inputSearchValue);
        searchParams.set("type", selectedOption);

        if (!data?.items?.length) {
            setIsDataEmpty(true)
        } else {
            setIsDataEmpty(false)
        }

        if (isDataEmpty) {
            searchParams.set("page", 1);
        } else {
            searchParams.set("page", currentPage);
        }

        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        });
    };

    useEffect(() => {
        if (!debounceInputValue) return;

        dispatch(fetchSearchGithubDataLoading());

        const fetchDataFromApi = async () => {
            try {
                const apiData = await fetchSearchGithubData(
                    selectedOption,
                    debounceInputValue,
                    currentPage,
                    dispatch
                );
                dispatch(fetchSearchGithubDataSuccess(apiData));
            } catch (error) {
                dispatch(fetchSearchGithubDataFailed(error));
            }
        };

        fetchDataFromApi();
    }, [currentPage, debounceInputValue, dispatch, selectedOption]);

    useEffect(() => {
        if (searchParams.get("q")) {
            setInputSearchValue(searchParams.get("q"));
        }
        if (searchParams.get("type")) {
            setSelectedOption(searchParams.get("type"));
        }
        if (searchParams.get("page")) {
            setCurrentPage(Number(searchParams.get("page")));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    useEffect(() => {
        updateURLParameters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearchValue, selectedOption, currentPage]);

    if (error || error?.isError) {
        return <ErrorPage error={error} />
    }

    const renderUserDetailComponent = () => {
        if (!data || data?.items?.length === 0) {
            return <NoDataFoundPage />;
        }

        return data?.items?.map(item => {
            if (selectedOption === DROPDOWN_OPTIONS.USERS) {
                return <ProfileCard key={item.id} item={item} />;
            } else {
                return <RepositoryCard key={item.id} item={item} />;
            }
        });
    }

    const handleSearchInputChange = (event) => {
        setInputSearchValue(event.target.value);
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <MainLayout>
            {/* Filters */}
            <StyledFilterContainer>
                <StyledSearchInput defaultValue={searchParams.get("q")} onChange={handleSearchInputChange} placeholder="Typing to search users or repositories .." />
                {/* Dropdown */}
                <StyledDropdownWrapper>
                    <StyledDropdownInput id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                        {Object.values(DROPDOWN_OPTIONS).map((option, index) => (
                            <option key={index} value={option}>{capitalizeText(option)}</option>
                        ))}
                    </StyledDropdownInput>
                </StyledDropdownWrapper>
            </StyledFilterContainer>

            {/* Cards */}
            <StyledCardContainer>
                {loading
                    ? renderSkeletonComponent()
                    : renderUserDetailComponent()}
            </StyledCardContainer>

            {/* Pagination */}
            {data?.items?.length > 0 ? <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            /> :
                null
            }
        </MainLayout>
    )
}

export default Home;