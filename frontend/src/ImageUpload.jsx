import axios from 'axios';
import React, { useState } from 'react';
import { AiFillFilePpt } from "react-icons/ai";
import { BsCheck, BsFillCloudArrowUpFill } from "react-icons/bs";

const ImageUpload = () => {
    const [filePar, setFilePar] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');

    const upload = async ({ target }) => {
        if (target.files.length !== 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(target.files[0]);

            const formData = new FormData();
            formData.append('file', target.files[0]);

            await axios.post('http://localhost:5000/upload-image', formData, {
                onUploadProgress: ({ loaded, total }) => {
                    const fileParsen = Math.floor((loaded / total) * 100);
                    let size = Math.floor(total / 1000);
                    size > 1024 ? size = (loaded / (1000 * 1000)).toFixed(2) + 'MB' : size = size + 'KB';
                    let name = target.files[0].name.length > 30 ? target.files[0].name.slice(0, 20) : target.files[0].name;
                    setFilePar(fileParsen);
                    setFileSize(size);
                    setFileName(name)
                }
            })
        }
    }

    return <div className="wapper">
        <header>Image Upload</header>
        <input onChange={upload} id='image' type="file" hidden />
        <label id="form" htmlFor='image'>
            {
                image ? <img src={image} alt="" /> : <>
                    <BsFillCloudArrowUpFill />
                    <p>Browser image upload</p>
                </>
            }
        </label>
        <section id="progress_area" className="progress_area">
            {
                (filePar && filePar !== 100) && <li className="row">
                    <AiFillFilePpt />
                    <div className="content">
                        <div className="details">
                            <span className="name">{fileName}</span>
                            <span className="parsent">{filePar}%</span>
                        </div>
                        <div className="progress-bar">
                            <div style={{ width: `${filePar}%` }} className="progress"></div>
                        </div>
                    </div>
                </li>
            }
        </section>
        <section id="upload_area" className="upload_area">
            {
                filePar === 100 && <li className="row">
                    <div className="content">
                        <AiFillFilePpt />
                        <div className="details">
                            <span className="name">{fileName}</span>
                            <span className="size">{fileSize}</span>
                        </div>
                    </div>
                    <BsCheck />
                </li>
            }
        </section>
    </div>;
};

export default ImageUpload;
