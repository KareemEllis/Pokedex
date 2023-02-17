import './Controls.css';
import React, { useState } from "react";

function Controls(props) {

    function handleSearch(event){
        props.changeSearch(event.target.value.toLowerCase())
    }
    function handleRegion(event){
        console.log(event.target.value)
        props.changeRegion(event.target.value)
    }

    return (
        <div className='controls'>
            <div className='box'>
                <h2>Region</h2>
                <select name="regions" id="regions" onChange={handleRegion} value={props.currentRegion}>
                    <option value="Kanto">Kanto</option>
                    <option value="Johto">Johto</option>
                    <option value="Hoenn">Hoenn</option>
                    <option value="Sinnoh">Sinnoh</option>
                    <option value="Unova">Unova</option>
                    <option value="Kalos">Kalos</option>
                    <option value="Alola">Alola</option>
                    <option value="Galar">Galar</option>
                </select>
            </div>
            <div className='box'>
                <h2>Search</h2>
                <input 
                    type="text"
                    placeholder="Eg. Pikachu"
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}

export default Controls