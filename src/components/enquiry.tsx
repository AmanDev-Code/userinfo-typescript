import React, { useState, FC, ChangeEvent, useEffect } from 'react'
import "./style.css";
import Displayuser from './Displayuser';
import {
    createStyles,
    withStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { Button, Icon } from '@material-ui/core';
import { CloudCircleRounded } from '@material-ui/icons';
import { useStoreActions, useStoreState } from '../Redux/hooks';
import Idata from './interfaces';

const SubmitButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        color: '#21618C',
        padding: '6px 12px',
        position: 'relative',
        border: '1px solid',
        marginTop: '20px',
        lineHeight: 1.5,
        backgroundColor: '#fff',
        borderColor: '#0063cc',
        margin: '0 auto',
        display: 'flex',
        fontWeight: 'bold',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#21618C',
            borderColor: '#21618C',
            color: '#F4F6F7',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#F4D03F',
            borderColor: '#21618C',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(247, 249, 249,.5)',
        },
    },
})(Button);

const UpdateButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        color: '#C0392B',
        padding: '6px 12px',
        border: '1px solid',
        marginTop: '20px',
        lineHeight: 1.5,
        backgroundColor: '#fff',
        borderColor: '#0063cc',
        fontWeight: 'bold',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#C0392B',
            borderColor: '#21618C',
            color: '#F4F6F7',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#F4D03F',
            borderColor: '#21618C',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(247, 249, 249,.5)',
        },
    },
})(Button);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sub: {
            '& > *': {
                margin: theme.spacing(0),
            },
        },
    }),
);


const Enquiry: FC = () => {

    const classes = useStyles();

    const createUser = useStoreActions((store) => store.users.createUser);
    const removeUser = useStoreActions((store) => store.users.removeUser);
    const updateUser = useStoreActions((store) => store.users.updateUser);

    const [Id, setId] = useState<String>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [age, setAge] = useState<number | string>(0);
    const [toggleButton, setToggleButton] = useState(false);
    const [iseditItems, setIsEditItem] = useState<Idata | any>([]);

    const userdata = useStoreState((store) => store.users.items);

   


    const inputEventName = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "name") {
            setName(event.target.value)
        } else if (event.target.name === "email") {
            setEmail(event.target.value)
        } else {
            setAge(Number(event.target.value))
        }
    };


    // edit the current data card
    const editItems = (userid: String) => {
        const items_card_search_id: any = userdata.find((val) => {

            if (val.userId === userid) {
                setId(userid)
                setIsEditItem(String(Id))
                console.log(iseditItems)
                setToggleButton(true);
                return val;
                
            }
            return null
        });
        setIsEditItem(items_card_search_id.userId)
        console.log(items_card_search_id)
        console.log(iseditItems)
        setName(items_card_search_id?.userName);
        setEmail(items_card_search_id?.userEmail);
        setAge(items_card_search_id?.userAge);
        
        
    }


    // delete Item in card
    const deleteItem = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Deleting a User \nid: ${id} \nName: ${name} \ncan't be restored?`);
        if (!isConfirmed) return;
        removeUser(String(id));
    }

    const onSubmits = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((!name) || (!email) || (!age)) {
            alert("Please fill the data")
        } else if ((name) && (email) && (age) && (toggleButton)) {
            console.log(iseditItems)
            updateUser({ userId: iseditItems, userName: name, userEmail: email, userAge: Number(age) })
            setName("");
            setEmail("");
            setAge("");
            setToggleButton(false);
        } else {
            createUser({ userId: String(Number(Math.random().toString().slice(2, 11))), userName: name, userEmail: email, userAge: Number(age) });
            setName("");
            setEmail("");
            setAge("");
        }


    }

    //redering the JSX and displaying the core results
    return (
        <>
            <div className="main-div">
                <div className="htmlform">
                    <div className="addItems">
                        <form className="additemform" onSubmit={onSubmits}>

                            <label>
                                <input type="text" placeholder="enter your name" value={name} name="name" onChange={inputEventName} autoFocus /><br />

                                <input type="text" placeholder="email" value={email} name="email" onChange={inputEventName} autoFocus /><br />

                                <input type="number" placeholder="age" value={age} name="age" onChange={inputEventName} autoFocus /><br />
                                {toggleButton ? <UpdateButton type="submit" className={classes.sub} endIcon={<CloudCircleRounded />}> Update</UpdateButton> : <SubmitButton type="submit" variant="contained" className={classes.sub} color="secondary" endIcon={<Icon>send</Icon>}>Submit</SubmitButton>}
                            </label>

                        </form>
                    </div>
                    {/* show our item */}

                    < div className="showItems" >
                        {userdata.map((data: any, key: number) => {
                            return (
                                <>
                                    <Displayuser key={key} data={data} deleteItem={deleteItem} editItems={editItems} />

                                </>
                            )
                        })}
                    </div >

                </div>
            </div>

        </>
    )
}

export default Enquiry