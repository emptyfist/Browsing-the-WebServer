import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileInfo } from '../../types';
import FolderIcon from '../../assets/svg/folder.svg';
import FileIcon from '../../assets/svg/file.svg';
import TrashIcon from '../../assets/svg/trash.svg';

interface Props {
  data: FileInfo,
  refresh: (path: string) => void,
  showConfirm: (name: string) => void
}

const BE_URL = process.env.BACKEND_URL ?? 'http://localhost:8088';

const ListEntry = ({data, refresh, showConfirm}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const decorateFileSize = (val: number) => {
    if (val < 1024) return `${val}byte`;
    else if (val < 1024 * 1024) return `${Math.ceil(val / 1024)}KB`;
    else if (val < 1024 * 1024 * 1024) return `${Math.ceil(val / 1024 / 1024)}MB`;
    else if (val < 1024 * 1024 * 1024 * 1024) return `${Math.ceil(val / 1024 / 1024 / 1024)}GB`;
    else return `${Math.ceil(val / 1024 / 1024 / 1024 / 1024)}TB`;
  }

  return (
    <div className="list-entry-wrapper">
      <div className="list-entry">
        {data.Type === 'File' ? <img src={FileIcon} alt="folder" /> : <img src={FolderIcon} alt="file" />}
        {data.Type === 'File' ? 
          <a 
            className='entry-name' 
            href={`${BE_URL}/api/file/download?path=${location.pathname === '/' ? '' : location.pathname}/${data.Name}`} 
            download
          >
            {`${data.Name}   ${decorateFileSize(data.Size)}`}
          </a> : 
          <span 
            className='entry-name' 
            onClick={e=> {
              const path = `${location.pathname === '/' ? '' : location.pathname}/${data.Name}`;
              navigate(path);
              if (refresh) refresh(path);
            }}
          >
            {data.Name}
          </span>
        }
      </div>
      <button 
        className="delete-btn" 
        // disabled={data.Type !== 'File'}
        onClick={(e)=>{
          if (showConfirm) showConfirm(data.Name);
        }}
      >
        <img src={TrashIcon} alt="Delete" />
      </button>
    </div>
  )
}

export default ListEntry;
