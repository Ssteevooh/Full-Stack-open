import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import {SuccessNotification, ErrorNotification} from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhonenumber, setNewPhonenumber] = useState('');
    const [searchName, setSearchName] = useState('');
    const [successNotification, setSuccessNotification] = useState(null)
    const [errorNotification, setErrorNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPerson => {
                setPersons(initialPerson)
            })
    }, []);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhonenumberChange = (event) => {
        setNewPhonenumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            phonenumber: newPhonenumber,
        };

        const existingPerson = persons.find((person) => person.name === newName ||
            person.phonenumber === newPhonenumber);

        if (existingPerson) {
            const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`

            if (window.confirm(confirmMessage)) {
                const replaceNumber = { ...existingPerson, phonenumber: newPhonenumber }

                personService
                    .update(existingPerson.id, replaceNumber)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
                    })
                    .catch(error => {
                        alert("Error updating person", error)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSuccessNotification(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccessNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    alert("Error creating person", error)
                })
        }
        setNewName('');
        setNewPhonenumber('');
    };

    const deletePerson = (id) => {
        const deletedPerson = persons.find((person) => person.id === id)
        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                setErrorNotification(`Information of ${deletedPerson.name} has already been removed from server`, error)
                setTimeout(() => {
                    setErrorNotification(null)
                }, 5000)
            })
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <SuccessNotification message={successNotification} />
            <ErrorNotification message={errorNotification} />
            <Filter
                searchName={searchName}
                handleSearchChange={handleSearchChange} />
            <h1>Add new</h1>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newPhonenumber={newPhonenumber}
                handlePhonenumberChange={handlePhonenumberChange} />
            <h1>Numbers</h1>
            <Persons
                persons={persons}
                searchName={searchName}
                deletePerson={deletePerson} />
        </div>
    );
};

export default App;