import { useState, useMemo } from 'react';
import { useGetContactsQuery } from '../../redux/contactsReducer.js';
import { useDeleteContactMutation } from '../../redux/contactsReducer.js';
import Filter from '../filter/Filter';
import styles from './ContactList.module.css';



export default function ContactList() {
    const { isLoading } = useGetContactsQuery();
    const [deleteContact] = useDeleteContactMutation();
    const [filter, setFilter] = useState('');
    const { data: contacts } = useGetContactsQuery();
    

    const filterContacts = useMemo(() => {
        return (
            contacts?.filter(item =>
                item.name.toLowerCase().includes(filter.toLowerCase())
            ) ?? []
        );
    }, [filter, contacts]);


    return (
        <div>
            <Filter filter={filter} onChange={setFilter}/>
        <ul>
            {isLoading ? (
                <b>Loading...</b>
            ) : (filterContacts.map(contact => {
                return (
                    <li key={contact.id} className={styles.contactList_item}>
                        <p className={styles.item_text}>{contact.name}: <span className={styles.item_span}>{contact.number}</span></p>
                        <button type="button" className={styles.item_btn} onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                )
            }))}
            </ul>
         </div>
    );
};