const Person = ({ person, deletePerson }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id);
        }
    };

    return (
        <div>
            {person.name} {person.phonenumber}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

const Persons = ({ persons, searchName, deletePerson }) => {
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

    return (
        <div>
            {filterPersons.map(person => <Person person={person} deletePerson={deletePerson} key={person.id} />)}
        </div>
    );
};

export default Persons;