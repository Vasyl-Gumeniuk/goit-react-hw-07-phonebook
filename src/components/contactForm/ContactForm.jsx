import { useState } from 'react';
import { useGetContactsQuery } from '../../redux/contactsReducer.js';
import { useAddContactMutation } from '../../redux/contactsReducer.js';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const { data: contacts } = useGetContactsQuery();
    const [addContact] = useAddContactMutation();


    const createContact = async user => {
        await addContact(user);
    };


    const cheakAddContact = name => {
        const isValidate = contacts.find(item => item.name === name);
        isValidate && alert(`${name} is already in contacts`);
        return isValidate;
    };

    const handleSubmut = e => {
        e.preventDefault();
        const isValidate = cheakAddContact(name);
        resetForm();
        if (isValidate) return;
        createContact({ name, number });
        resetForm();
    };

    const handleInputChange = evt => {
        const { name } = evt.currentTarget;
        const { value } = evt.currentTarget;

        switch (name) {
            case "name":
                setName(value);
                break;
            
            case "number":
                setNumber(value);
                break;
            
            default:
                return;
        }
    }

    const resetForm = () => {
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={handleSubmut} className={styles.form}>
            <label className={styles.formLabel}>
                Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                />
            </label>

            <label className={styles.formLabel}>
                Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleInputChange}
                    className={styles.formInput}
                />
            </label>

            <button type="submit" className={styles.formBtn}>Add contact</button>
        </form>
    );
}