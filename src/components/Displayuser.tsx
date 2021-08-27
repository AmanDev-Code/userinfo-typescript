
import { Link } from 'react-router-dom';
import Idata from './interfaces';

interface Props {
    data: Idata;
    deleteItem(uniqueid: number | string, userName: string): void;
    editItems(uniqueid: String): void;
    
}

const Displayuser = ({ data, deleteItem, editItems }: Props) => {

    return (
        <>
        
                <div className="eachItem" key={Number(data.userId)}>
                    <h3 >{data.userName}</h3>
                    <h3 >{data.userEmail}</h3>
                    <h3 >{data.userAge}</h3>
                    <div><i className="fas fa-edit" onClick={() => { editItems(data.userId); }}></i>
                        <i className="fas fa-trash-alt" onClick={() => { deleteItem(Number(data.userId), data.userName); }}></i>
                    <Link to={'/information/'+data.userId}>
                        <i className="fas fa-arrow-alt-circle-right" ></i> </Link ></div >

                </div >
           
            
        </>
    )
}

export default Displayuser;