import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhonenumber, setNewPhonenumber] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPerson => {
                setPersons(initialPerson)
            });
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
        if (persons.some((person) => person.name === newName) ||
            persons.some(((person) => person.phonenumber === newPhonenumber))) {
            alert(`${newName} or ${newPhonenumber} is already added to phonebook`);
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('');
                    setNewPhonenumber('');
                })
        }
    };

    const deletePerson = (id) => {
        personService
            .remove(id)
            .then()
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searchName={searchName}
                handleSearchChange={handleSearchChange} />
            <h2>Add new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newPhonenumber={newPhonenumber}
                handlePhonenumberChange={handlePhonenumberChange} />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                searchName={searchName}
                deletePerson={deletePerson} />
        </div>
    );
};

export default App;