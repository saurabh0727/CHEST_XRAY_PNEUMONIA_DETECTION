import React, { useState, useRef } from 'react';
import axios from "axios";
import FileBase from 'react-file-base64';
import './Predict.css';
import Navbar from './Navbar';
import Image1 from './images/image1.png'

const Predict = () => {
    const [image, setImage] = useState();
    const [result, setResult] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const api = "http://127.0.0.1:8000/predict";
    const fileInputRef = useRef(null);

    const predict = async () => {
        try {
            if (isImageSelected) {
                const data = {
                    "image": image.split(",")[1]
                };
                const response = await axios.post(api, data);
                if (response) {
                    console.log(response.data);
                    setResult(response.data);
                }
            } else {
                alert("Please select an image")
            }
        } catch (err) {
            console.log(err);
        }
    };

    const convertToBase64 = (e) => {
        setResult(null);
        setIsImageSelected(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <Navbar />
            <div className="main-wrapper">
                <div className="main-input-div">
                    <div className="input-image-div" onClick={triggerFileInput}>
                        <div>
                            {isImageSelected ? (
                                <div>
                                    <i className="fas fa-check-circle" style={{ color: 'lightgreen' }}></i>
                                    <p> Image is selected </p>
                                </div>
                            ) : (
                                <div>
                                    <i className="fas fa-upload"></i>
                                    <p> Click to Upload Image </p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        id="imageupload"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => convertToBase64(e)}
                    />

                    <button onClick={predict}>Predict</button>
                </div>
                <div className="main-info-div">
                    <h1 style={{textAlign:'center'}}>Result Of Scan</h1>
                    {/* {result ? (
                        <div>
                            {result}
                        </div>
                    ) : (
                        "Upload image in order to get results of your X-Rays."
                    )} */}

                    
                    {result && result === "yes" ? (
                        <p><span style={{color:'red'}}>PNEUMONIA DETECTED.</span> This finding indicates that there are abnormalities present in your chest X-ray suggestive of pneumonia, a serious lung infection. While this analysis provides valuable initial insights, it's crucial that you seek guidance from a qualified healthcare professional for a thorough evaluation and personalized treatment plan."</p>
                    ) : result && result === "no" ? (
                        <p style={{color:'lightgreen'}}>Your chest X-ray appears normal. This means that no abnormalities indicative of pneumonia or other significant lung conditions were detected. While this result is encouraging, it's still important to monitor your health and seek medical attention if you experience any concerning symptoms or if your condition changes."</p>
                    ): result && result === "err" ?(
                        <p>Something went wrong. Upload another image!"</p>
                    ):""}


                </div>
            </div>


            <div className="below-wrapper">
                <div className="below-wrapper-text">
                    <h1>What it does?</h1>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                <div className="below-wrapper-img">
                    <img src={Image1} alt="image1" />
                </div>

            </div>
        </div>
    );
};

export default Predict;
