import React, { Component } from 'react';
import { SearchBar } from './common/SearchBar';
import { ImageList } from './common/ImageList';

class App extends Component {
    render() {
        return (
            <div>
                <SearchBar />
                <ImageList />
            </div>
        );
    }
}

export default App;
