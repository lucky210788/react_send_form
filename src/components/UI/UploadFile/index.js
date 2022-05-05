import React, {useState} from 'react';
import classNames from "classnames";
import "./UploadFile.scss"

const UploadFile = ({onChangePhoto, onDeletePhoto, error}) => {
    const [file, setFile] = useState(null);

    const handleAddFile = (photo) => {
        setFile(photo);
        onChangePhoto(photo);

        const img = document.createElement("img");
        this.state.backgroundImageFile = photo;

        img.onload = function () {
            debugger;
            console.log(this.width + " " + this.height);
        };



    }

    const handleRemoveFile = () => {
        setFile(null);
        onDeletePhoto();
    }

    return (
        <div className="upload-file">
            <label className={classNames('upload-file__label', {'upload-file__label__error': error})}>
                <input
                    type="file"
                    onChange={e => handleAddFile(e.target.files[0])}
                />
                Upload
            </label>
            {file
               ? <p
                    className={classNames('file-preview file-preview__active', {'file-preview__error': error})}
                    onClick={handleRemoveFile}
                >
                    {file.name}
                </p>
                : <p className={classNames('file-preview', {'file-preview__error': error})}>Upload your photo</p>
            }
            {error && <p className="upload-file__error">{error}</p>}
        </div>
    );
};

export default UploadFile;