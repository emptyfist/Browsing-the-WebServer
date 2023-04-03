import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { FileInfo } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWrapper } from '../../helpers/fetch-wrapper';
import WaitingComponent from '../Waiting/Waiting';
import ListEntry from './ListEntry';
import ConfirmModal from '../ConfirmModal';
import { ListResponse } from '../../types';

interface Props {
  isLoading: boolean,
  list: FileInfo[],
  refresh: (path: string) => void,
};

const ListPresenter = ({isLoading, list, refresh}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selName, setSelName] = useState('');

  const showConfirmDlg = (name: string) => {
    setSelName(name);
  }

  const closeModal = async (isDelete: boolean) => {
    if (isDelete) {
      const result = await fetchWrapper.delEntry(`/api/file/delete?path=${location.pathname === '/' ? '' : location.pathname}/${selName}`)
        .then((res:ListResponse) => {
          if (res.Result === false) {
            toast.error(`Error message from Server : ${res.ErrorMessage}`);
          } else {
            toast.success(`${selName} is deleted`);
            return true;
          }
        }).catch((err: ListResponse | undefined) => {
          toast.error("Error occured while browsing sever")
          console.log(err);
        });

      if (result === true && refresh)
        refresh(location.pathname);
    }
    
    setSelName('');
  }

  return (
    <div className="list-presenter">
      {isLoading ? 
        <WaitingComponent /> : 
        <>
          {location.pathname !== '/' && 
            <div className='go-upper' onClick={e => {
              const path = location.pathname.split('/').slice(0, -1).join('/');
              navigate(path);
              if (refresh) refresh(path);
            }}>
              ... go back
            </div>
          }
          {list.map((entry: FileInfo, idx: number) => (
            <ListEntry data={entry} refresh={refresh} showConfirm={showConfirmDlg} key={idx}/>
          ))}
          <ConfirmModal caption={selName} closeModal={closeModal} />
        </>
      }
    </div>
  )
}

export default ListPresenter;
