import './Controls.css';
import React, { useState } from "react";

function Controls(props) {

    function handleSearch(event){
        props.changeSearch(event.target.value)
    }
    function handleRegion(event){
        console.log(event.target.value)
        props.changeRegion(event.target.value)
    }
    function handleSort(event){
        props.changeSort(event.target.value)
    }
    function handleType(event){
        props.changeType(event.target.value)
    }

    return (
        <div className='controls'>
            <div className='box'>
                <h2>Region</h2>
                <select name="regions" id="regions" onChange={handleRegion}>
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
                <h2>Type</h2>
                <select name="type" id="type" onChange={handleType}>
                    <option value="Bug">All Types</option>
                    <option value="Bug">Bug</option>
                    <option value="Dark">Dark</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Electriv">Electric</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Fire">Fire</option>
                    <option value="Flying">Flying</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Grass">Grass</option>
                    <option value="Ground">Ground</option>
                    <option value="Ice">Ice</option>
                    <option value="Normal">Normal</option>
                    <option value="Poison">Poison</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Rock">Rock</option>
                    <option value="Steel">Steel</option>
                    <option value="Water">Water</option>
                </select>
            </div>
            <div className='box'>
                <h2>Sort By</h2>
                <select name="sort" id="sort" onChange={handleSort}>
                    <option value="ID">ID</option>
                    <option value="Name">Name</option>
                </select>
            </div>
            <div className='box'>
                <h2>Search</h2>
                <input 
                    type="text"
                    placeholder="Pikachu"
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}

export default Controls