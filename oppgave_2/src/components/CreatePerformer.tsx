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

    const [submitButtonText, setSubmitButtonText] = useState('Create Performer');


    
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

  const clearForm = () => {
    setPerformerId('');
    setGender('');
    setSportType('');
    setHeartRate('');
    setWatt('');
    setSpeed('');
  };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSubmitButtonText('Saving...');

      const heartRateInt = parseInt(heartRate, 10);
      const wattInt = parseInt(watt, 10);
      const speedInt = parseInt(speed, 10);
  
      
      if (isNaN(heartRateInt) || isNaN(wattInt) || isNaN(speedInt)) {
          console.error("Invalid input: heartRate, watt, or speed is not a number.");
          return; 
      }
      const newPerformer = { 
        userId: performerId, 
        gender, 
        sport: sportType, 
        heartRate: heartRateInt, 
        watt: wattInt, 
        speed: speedInt 
    };

    try {
      const response = await fetch('/api/users/createUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPerformer),
      });

      if (response.ok) {
          setSubmitButtonText('Performer Saved!');
          clearForm();
          
      } else {
          setSubmitButtonText('Error: Could not save');
      }
  } catch (error) {
      setSubmitButtonText(`Error: ${error.message}`);
  }

  };
  
  console.log("userId: ", performerId)

    return (
      <div className='create-performer'>
        <form onSubmit={handleSubmit}  className="form flex w-full flex-col ">
            <label>
                User ID:
                <input type="text" value={performerId} onChange={handleIdChange} className='form__input --default'/>
            </label>
            <br />
            <div className="create-performer-form-row">
                <div className="create-performer-form-field">
                    <label>
                        Gender:
                        <select value={gender} onChange={handleGenderChange} className='create-performer-form__select'>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="create-performer-form-field">
                    <label>
                        Sport Type:
                        <select value={sportType} onChange={handleSportTypeChange} className='create-performer-form__select'>
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
                </div>
            </div>
            <br />
            <label>
              Heart Rate:
              <input type="text" value={heartRate} onChange={handleHeartRateChange} className='form__input --default'/>
            </label>
            <br />
            <label>
              Watt:
              <input type="text" value={watt} onChange={handleWattChange} className='form__input --default'/>
            </label>
            <br />
            <label>
              Speed:
              <input type="text" value={speed} onChange={handleSpeedChange} className='form__input --default'/>
            </label>
            <br />
            <button
                type="submit"
                className={`form__button ${
                  submitButtonText === "Performer Saved!" ? "--saved" : ""
                } ${submitButtonText.startsWith("Error") ? "--error" : ""}`}>
                {submitButtonText}
            </button>
        </form>
      </div>
    );
        
};

export default CreatePerformer;
