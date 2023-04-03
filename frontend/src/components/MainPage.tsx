import React, {useRef, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import UploadComponent from './Upload/UploadComponent';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { ListPresenter } from './FileList';
import { FileInfo, ListResponse } from '../types';

const MainpPage = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [fileList, setList] = useState<FileInfo[]>([]);

    const isMounted = useRef<boolean>(true);
    const location = useLocation();

    const getList = async (path: string) => {
        if (!isMounted.current) return;
        setLoading(true);

        fetchWrapper.get(`/api/file/list?${path !== '/' ? 'path=' + path : ''}`).then((res:ListResponse) => {
            if (res.Result === false) {
                toast.error(`Error message from Server : ${res.ErrorMessage}`);
                return;
            }

            isMounted.current && setList(res.FileList);
            isMounted.current && setLoading(false);
        }).catch((err: ListResponse | undefined) => {
            toast.error("Error occured while browsing sever")
            console.log(err);

            isMounted.current && setList([]);
            isMounted.current && setLoading(false);
        });
    }

    const refreshPage = (path: string) => {
        setList([]);
        getList(path);
    }

    useEffect(() => {
        getList(location.pathname);
        return () => {
            isMounted.current =false;
        }

        // eslint-disable-next-line
    },[]);

    return (
        <div className="main-wrapper">
            <div className='container'>
                <h2>Curling Site</h2>
                <div className='list-wrapper'>
                <ListPresenter 
                    isLoading={isLoading}
                    list={fileList}
                    refresh={refreshPage}
                />
                </div>
                <div className='divider' />
                <div className='upload-wrapper'>
                    <UploadComponent refresh={refreshPage}/>
                </div>
            </div>
        </div>
    )
}

export default MainpPage;