"use client"

import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from "react"

import "../style/form.scss"

const CreatePerformer = () => {
    const [performerId, setPerformerId] = useState('');
    const [gender, setGender] = useState('');
    const [sportType, setSportType] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [watt, setWatt] = useState('');
    const [speed, setSpeed] = useState('');

    
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPerformerId(e.target.value);
    };
  
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setGender(e.target.value);
    };
  
  const handleSportTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSportType(e.target.value);
    };

  const handleHeartRateChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHeartRate(e.target.value);
  };

  const handleWattChange = (e: ChangeEvent<HTMLInputElement>) => {
      setWatt(e.target.value);
  };

  const handleSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSpeed(e.target.value);
  };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newPerformer = { performerId, gender, sportType };
      console.log(newPerformer);
      //TODO: add api

  };
  

    return (
      <div className='create-performer'>
        <form onSubmit={handleSubmit}  className="form flex w-full flex-col space-y-4">
            <label>
                User ID:
                <input type="text" value={performerId} onChange={handleIdChange} className='form__input'/>
            </label>
            <br />
            <label>
                Gender:
                <select value={gender} onChange={handleGenderChange} className='form__select'>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <br />
            <label>
                Sport Type:
                <select value={sportType} onChange={handleSportTypeChange} className='form__select' >
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
            <label>
              Heart Rate:
              <input type="text" value={heartRate} onChange={handleHeartRateChange} className='form__input'/>
            </label>
            <br />
            <label>
              Watt:
              <input type="text" value={watt} onChange={handleWattChange} className='form__input'/>
            </label>
            <br />
            <label>
              Speed:
              <input type="text" value={speed} onChange={handleSpeedChange} className='form__input'/>
            </label>
            <br />
            <button type="submit" className='form__button'>Create Performer</button>
        </form>
      </div>
    );
        
};

export default CreatePerformer;
