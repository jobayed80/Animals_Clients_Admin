

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Extra = () => {


    const [formData, setFormData] = useState({
        username: '',
        name: '',
        scientific_name: '',
        classification: '',
        size: '',
        weight: '',
        skin_color: '',
        gestation_period: '',
        other_info: '',
        image: null,
    });

    // jokhnsignup kori tokhn username ta ke store kora hoi
    const storedUsername = localStorage.getItem('username');
    useEffect(() => {
        // Load the stored username from local storage
        if (storedUsername) {
            setFormData((prevData) => ({ ...prevData, username: storedUsername }));
        }
        console.log("nam ashce" +storedUsername)
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8082/addAnimalData', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data);
            console.log("Submit + " +response)
        } catch (error) {
            console.error('There was an error!', +error);
        }
    };





    return (

        <>
        
        {/* <div className="App mt-[80rem]">
            <h1>Animal Data Entry</h1>
            <h1>{storedUsername}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="text" name="scientific_name" placeholder="Scientific Name" onChange={handleChange} />
                <input type="text" name="classification" placeholder="Classification" onChange={handleChange} />
                <input type="text" name="size" placeholder="Size" onChange={handleChange} />
                <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
                <input type="text" name="skin_color" placeholder="Skin Color" onChange={handleChange} />
                <input type="text" name="gestation_period" placeholder="Gestation Period" onChange={handleChange} />
                <textarea name="other_info" placeholder="Other Info" onChange={handleChange} />
                <input type="file" name="image" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div> */}
        
        
        </>
    )
}

export default Extra