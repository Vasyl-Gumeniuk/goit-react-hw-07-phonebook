import ContactList from './contactList/ContactList.jsx';
import ContactForm from './contactForm/ContactForm.jsx';
import styles from './App.module.css';

export default function App() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Phonebook</h1>
            <ContactForm />
            <h2 className={styles.title}>Contacts</h2>
            <ContactList />
        </div>
    );
}