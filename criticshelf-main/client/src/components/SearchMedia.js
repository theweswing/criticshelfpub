import React, { useState} from "react";
import { Switch, Route } from "react-router-dom";
import SearchGames from "./SearchGames";
import SearchMovies from "./SearchMovies";
import SearchBooks from "./SearchBooks";
import SearchTV from "./SearchTV";
import SearchAlbums from "./SearchAlbums";

function SearchMedia({theme, user}) {
const [searchedCategory,setSearchedCategory] = useState("")

return (
    <div>
    <Switch>
        <Route exact path="/search/games">
    <SearchGames user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    <Route exact path="/search/movies">
    <SearchMovies user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    <Route exact path="/search/books">
    <SearchBooks user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    <Route exact path="/search/TV">
    <SearchTV user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    <Route exact path="/search/music">
    <SearchAlbums user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    <Route path="/search">
    <SearchMovies user={user} theme={theme} searchedCategory={searchedCategory} setSearchedCategory={setSearchedCategory}/>
    </Route>
    </Switch>
    </div>
)
}


export default SearchMedia