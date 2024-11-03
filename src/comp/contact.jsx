
import React, { useState, useEffect, useRef } from 'react'
import './contact.css'
import axios from 'axios';

import emailjs from '@emailjs/browser';

const Contact = () => {



    let [name, setName] = useState("")
    let [nameErr, setNameErr] = useState("")
    let [email, setEmail] = useState("")
    let [emailErr, setEmailErr] = useState("")
    let [subject, setSubject] = useState("")
    let [subjectErr, setSubjectErr] = useState("")
    let [message, setMessage] = useState("")
    let [messageErr, setMessageErr] = useState("")





    // emailjs start
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_2y4cdsq', 'template_jau2uko', form.current, {
                publicKey: 'EcMIFMRq8LkKVGmuq',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    //   email.js end


    return (
        <>

            {/* <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form> */}

            <div className='contact'>
                <div className='container'>
                    <div className='form'>
                        <h2>#contact us</h2>
                        <form ref={form} onSubmit={sendEmail} >
                            <div className='box'>
                                <div className='lable'>
                                    <h4>Name</h4>
                                </div>
                                <div className='input'>
                                    <input name="from_name" onChange={(e) => setName(e.target.value)}  type='text' placeholder='Name'></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='lable'>
                                    <h4>E-mail</h4>
                                </div>
                                <div className='input'>
                                    <input type='email' placeholder='E-mail' name="from_email" onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='lable'>
                                    <h4>Subject</h4>
                                </div>
                                <div className='input'>
                                    <input type='text' placeholder='Subject' name="from_subject" onChange={(e) => setSubject(e.target.value)} ></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='lable'>
                                    <h4>Message</h4>
                                </div>
                                <div className='input'>
                                    <textarea placeholder='Message !' name="message" onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                            </div>
                            <button> <input type="submit" value="Send"></input></button>

                           
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact