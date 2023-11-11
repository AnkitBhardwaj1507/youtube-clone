import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {  Search_results_api } from "../utils/Constant";
import SearchVideoCard from "./SearchVideoCard";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setChannelId } from "../utils/channelIdSlice";
import { closeMenu } from "../utils/appSlice";

//Search Result
const SearchResultsPage = () => {
    const [params] = useSearchParams();
    const query = params.get("q");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        getSearchData();
        dispatch(closeMenu());
    }, [query]);

    const getSearchData = async () => {
        const data = await fetch(Search_results_api + query + "&key=AIzaSyC9hgB4pfQxk9V2cZmvq2si_LTXpsIvu2Q");
        const json = await data.json();
        setSearchResults(json?.items);
    }

    return (
        <div className="p-2 w-full dark:bg-slate-800 overflow-y-hidden">
            
            {
                searchResults.map((result) => <Link
                key={result?.id?.videoId}
                to={"/watch?v="+ result?.id?.videoId}
                onClick={()=>{
                    dispatch(setChannelId(result?.snippet?.channelId))
                }}>
                    <SearchVideoCard data={result?.snippet} />
                </Link>)
            }
        </div>
    )
}

export default SearchResultsPage;