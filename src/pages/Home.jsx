/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import GithubIcon from '@/assets/github-icon.png'
import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import Loading from "@/components/common/Loading";
import ErrorPage from "@/components/ErrorPage";
import { fetchSearchGithubData } from "@/api/fetchSearchGithubData";
import { fetchSearchGithubDataFailed, fetchSearchGithubDataLoading, fetchSearchGithubDataSuccess } from "@/redux/actions/githubDataAction";
import { DROPDOWN_OPTIONS } from "@/constants";
import capitalizeText from "@/utils/capitalizeText";
import SkeletonCard from "@/components/common/SkeletonCard";
import useDebounce from "@/hooks/useDebounce";

// HEADER
const StyledMainHeaderContainer = styled.header`
    width: 100%;
`

const StyledHeaderWrapper = styled.div`
    display: flex;
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
    margin-left: 10px;
    height: 39.5px;
    padding: 10px;
    width: 120px;
`

// CARD
const StyledCardContainer = styled.div`
    display: grid;
    margin-top: 25px;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    background-color: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background */
`

export default function Home() {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(DROPDOWN_OPTIONS.USERS);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputSearchValue, setInputSearchValue] = useState('');
    const debounceInputValue = useDebounce(inputSearchValue, 300)
    const { data, loading, error } = useSelector(({ githubData }) => githubData);

    const totalPages = data.total_count || 10;

    useEffect(() => {
        if (!debounceInputValue) return

        dispatch(fetchSearchGithubDataLoading());

        const fetchDataFromApi = async () => {
            try {
                const apiData = await fetchSearchGithubData(selectedOption, debounceInputValue, currentPage);
                dispatch(fetchSearchGithubDataSuccess(apiData));
            } catch (error) {
                dispatch(fetchSearchGithubDataFailed(error));
            }
        };

        fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, debounceInputValue, dispatch, selectedOption]);

    if (error) {
        return <ErrorPage message={error} />
    }

    const handleSearchInputChange = (event) => {
        setInputSearchValue(event.target.value)
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
        <div>
            {/* Header */}
            <StyledMainHeaderContainer>
                <StyledHeaderWrapper>
                    <StyledHeaderIcon src={GithubIcon} />
                    <StyledHeaderInfoWrapper>
                        <StyledHeaderTitle>Github Searcher</StyledHeaderTitle>
                        <span>Search users or repositories below</span>
                    </StyledHeaderInfoWrapper>
                </StyledHeaderWrapper>
            </StyledMainHeaderContainer>

            {/* Filters */}
            <StyledFilterContainer>
                <StyledSearchInput onChange={handleSearchInputChange} placeholder="Typing to search users or repositories .." />
                {/* Dropdown */}
                <StyledDropdownInput id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                    {Object.values(DROPDOWN_OPTIONS).map((option, index) => (
                        <option key={index} value={option}>{capitalizeText(option)}</option>
                    ))}
                </StyledDropdownInput>
            </StyledFilterContainer>

            {/* Cards */}
            <StyledCardContainer>
                {loading ? (
                    Array.from({ length: 9 }, (_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) :
                    DivLoopComponent()
                }
            </StyledCardContainer>

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

function DivLoopComponent() {
    const divCount = 9; // Number of times to loop

    const divs = [];

    for (let i = 0; i < divCount; i++) {
        divs.push(<div style={{
            background: 'grey',
            color: 'white',
            height: '100px'
        }} key={i}>Div {i + 1}</div>);
    }

    return divs;
}