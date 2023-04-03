import React, {useRef, useState} from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { fetchWrapper } from '../../helpers/fetch-wrapper';
import { ListResponse } from '../../types';
import UploadIcon from '../../assets/svg/upload.svg';
import WaitingComponent from '../../assets/3-dot';

interface Props {
    refresh: (path: string) => void,
};

const UploadComponent = ({ refresh } : Props) => {
    const location = useLocation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState<string>('');

    const uploadFile = async (e:any) => {
        if (!e.target.files.length) return;

        const file:any = e.target.files[0];
        setFilename(file.name);

        let formData = new FormData();
        formData.append('file', file);
        formData.append('path', location.pathname);

        await fetchWrapper.upload('/api/file/upload', formData)
            .then((res: ListResponse) => {
                if (res.Result) {
                    if (refresh) refresh(location.pathname);
                    toast.success("File uploaded successfully!");
                } else {
                    toast.error(`Error Message from Server : ${res.ErrorMessage}`);
                }
            }).catch((err: ListResponse | undefined) => {
                toast.error("Error occured while uploading file");
                console.log(err);
            });
        setFilename('');
    }

    return (
        <div className="upload-component">
            <span className='filename'>{filename.length > 0 ? filename : 'Please select file'}</span>
            <button 
                className='btn-upload' 
                disabled={filename.length > 0}
                onClick={(e) => { 
                    if (!fileInputRef.current) return;
                    fileInputRef.current.click();
                }}
            >
                {filename.length > 0 ? 
                    <WaitingComponent width={32} height={16} /> : 
                    <>
                        <span>Select File</span>
                        <img src={UploadIcon} alt="Upload File" />
                    </>
                }
            </button>
            <input type="file" hidden ref={fileInputRef} onChange={uploadFile}></input>
        </div>
    )
}

export default UploadComponent;