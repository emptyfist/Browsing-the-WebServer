import React from 'react';
import LoadingBlocksWave from '../../assets/blocks-wave';

const WaitingComponent = () => {
    return (
        <div className="waiting-wrapper">
            <LoadingBlocksWave width={48} height={48} />
        </div>
    )
}

export default WaitingComponent;