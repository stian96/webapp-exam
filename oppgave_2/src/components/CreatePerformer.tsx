"use client"

import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from "react"

const CreatePerformer = () => {
    const [performerId, setPerformerId] = useState('');
    const [gender, setGender] = useState('');
    const [sportType, setSportType] = useState('');

    
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPerformerId(e.target.value);
    };
  
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setGender(e.target.value);
    };
  
  const handleSportTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSportType(e.target.value);
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newPerformer = { performerId, gender, sportType };
      console.log(newPerformer);
      //TODO: add api

  };
  

    return (
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='performer-form'>
            <label>
                User ID:
                <input type="text" value={performerId} onChange={handleIdChange}/>
            </label>
            <br />
            <label>
                Gender:
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <br />
            <label>
                Sport Type:
                <select value={sportType} onChange={handleSportTypeChange}>
                    <option value="">Select Sport Type</option>
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                    <option value="skiing">Skiing</option>
                    <option value="triathlon">Triathlon</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <br />
            <button type="submit" className='form__button'>Create Performer</button>
        </form>
    




      </div>
    );
        
};

export default CreatePerformer;
