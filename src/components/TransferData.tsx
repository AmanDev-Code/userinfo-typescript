
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../Redux/hooks';
import './style.css'

const TransferData = () => {
    const userId: any = useParams();
    const userdetails = useStoreState((state) => {
        return state.users.userDetails
    });
    const setUserInfo = useStoreActions((store) => store.users.setUserInfo);
    setUserInfo(userId);
    return (
        <>
            <div className="showItems" >
                <div className='eachItem'>
                    <h1>Name: {userdetails.userName}</h1>
                    <h1>Name: {userdetails.userEmail}</h1>
                    <h1>Name: {userdetails.userAge}</h1>
                </div>
            </div>
        </>
    )
}

export default TransferData
