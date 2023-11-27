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

    const [errors, setErrors] = useState({
      userId: '',
      gender: '',
      sportType: '',
      heartRate: '',
      watt: '',
      speed: ''
    });
  
    
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

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;
  
    const fieldValues = {
      userId: performerId,
      gender: gender,
      sportType: sportType,
      heartRate: heartRate,
      watt: watt,
      speed: speed
    };
  
    const fieldsToValidate = {
      userId: 'User ID',
      gender: 'Gender',
      sportType: 'Sport Type',
      heartRate: 'Heart Rate',
      watt: 'Watt',
      speed: 'Speed'
    };
  
    for (const [key, displayName] of Object.entries(fieldsToValidate)) {
      if (!fieldValues[key].trim()) {
        newErrors[key] = `${displayName} is required`;
        isValid = false;
      }
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const prepareFormData = () => {
    const heartRateInt = parseInt(heartRate, 10);
    const wattInt = parseInt(watt, 10);
    const speedInt = parseInt(speed, 10);
  
    if (isNaN(heartRateInt) || isNaN(wattInt) || isNaN(speedInt)) {
      console.error("Invalid input: heartRate, watt, or speed is not a number.");
      return null;
    }
  
    return {
      userId: performerId, 
      gender, 
      sport: sportType, 
      heartRate: heartRateInt, 
      watt: wattInt, 
      speed: speedInt 
    };
  };
  
  const submitPerformerData = async (formData) => {
    try {
      const response = await fetch('/api/users/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitButtonText('Performer Saved!');
        clearForm();
      } else {
        const resData = await response.json();
        setSubmitButtonText('Error: ' + resData.message);
        
        if (resData.errors) {
          setErrors(resData.errors);
        }
      }
    } catch (error) {
      setSubmitButtonText(`Error: ${error.message}`);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonText('Saving...');
  
    if (!validateFields()) {
      setSubmitButtonText('Create Performer');
      return;
    }
  
    const formData = prepareFormData();
    if (!formData) {
      setSubmitButtonText('Create Performer');
      return;
    }
  
    await submitPerformerData(formData);
  };

    return (
      <div className='create-performer'>
        <form onSubmit={handleSubmit}  className="form flex w-full flex-col ">
            <label>
                User ID:
                <input type="text" id= "performerId" value={performerId} onChange={handleIdChange} className='form__input --default'/>
                {errors.userId && <span className="create-performer-error-message">{errors.userId}</span>}
            </label>
            <br />
            <div className="create-performer-form-row">
                <div className="create-performer-form-field">
                    <label htmlFor='genderSelection'>
                        Gender: </label>
                        <select value={gender} id= "genderSelection" onChange={handleGenderChange} className='create-performer-form__select'>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                   
                </div>
                {errors.gender && <span className="create-performer-error-message">{errors.gender}</span>}
                <div className="create-performer-form-field">
                    <label htmlFor='sportTypeSelection'>
                        Sport Type:  </label>
                        <select value={sportType} id= "sportTypeSelection" onChange={handleSportTypeChange} className='create-performer-form__select'>
                        
                            <option value="">Select Sport Type</option>
                            <option value="running">Running</option>
                            <option value="cycling">Cycling</option>
                            <option value="skiing">Skiing</option>
                            <option value="triathlon">Triathlon</option>
                            <option value="swimming">Swimming</option>
                            <option value="strength">Strength</option>
                            <option value="other">Other</option>
                                    
                        </select>
                    
                </div>
                {errors.sportType && <span className="create-performer-error-message">{errors.sportType}</span>}
            </div>
            <br />
            <label>
              Heart Rate:
              <input type="number" id="heartRate" value={heartRate} onChange={handleHeartRateChange} className='form__input --default'/>
              {errors.heartRate && <span className="create-performer-error-message">{errors.heartRate}</span>}
            </label>
            <br />
            <label>
              Watt:
              <input type="number" id="watt" value={watt} onChange={handleWattChange} className='form__input --default'/>
              {errors.watt && <span className="create-performer-error-message">{errors.watt}</span>}
            </label>
            <br />
            <label>
              Speed:
              <input type="number" id= "speed" value={speed} onChange={handleSpeedChange} className='form__input --default'/>
              {errors.speed && <span className="create-performer-error-message">{errors.speed}</span>}
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
